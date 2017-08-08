import data from './mock'
import superAgent from 'superagent'
import { intersection, uniq } from 'lodash'
import moment from 'moment'

export const environment = {
  production: true,
  gmapsApiKey: 'AIzaSyDmRDus2pDA2B7B61F3Kv2RHIxj0totUjI',
  gTzKey: 'AIzaSyAGqqc7xJCDhCUMqQsM-8_It1I_1d0aHns',
}

function getAllList () {
  return data
}

export function saveOrUpdate (item) {
  const exists = data.findIndex(data => data.id === item.id)
  if (exists !== -1) {
    data[exists] = item
    return
  }
  data.push(item)
}

export function getTimezoneByLatLng ({ lat, lng }) {
  const locationParams = {
    location: `${lat},${lng}`,
    key: environment.gTzKey,
    timestamp: (Math.floor(Date.now() / 1000)).toString()
  }
  return new Promise((resolve, reject) => {
    superAgent.get('https://maps.googleapis.com/maps/api/timezone/json')
    .query(locationParams)
    .end((err, tz) => {
      if (err) {
        reject(err)
      }
      const c = moment.duration(Math.abs(tz.body.rawOffset), 'seconds')
      const formatted = moment('2000-01-01 00:00:00').add(c).format('HH:mm')
      const sign = tz.body.rawOffset > 0 ? '+' : '-'
      resolve(`${tz.body.timeZoneId} (UTC${sign}${formatted})`)
    })
  })
}

function getLocationsByAddress (address) {
  const acceptableTypes = [
    'political', 'country', 'administrative_area_level_1', 'administrative_area_level_2'
  ]

  return new Promise((resolve, reject) => {
    superAgent.get('https://maps.googleapis.com/maps/api/geocode/json')
    .query({ address, key: environment.gmapsApiKey }).end((err, data) => {
      if (err) {
        reject(err)
      }
      const regions = data.body.results.filter(e => intersection(e.types, acceptableTypes).length)
      resolve(regions.map(r => r.geometry.location))
    })
  })
}

export function getTimeZoneByName (name) {
  return new Promise((resolve, reject) => {
    getLocationsByAddress(name).then((data) => {
      const promises = data.map(item => getTimezoneByLatLng(item))

      Promise.all(promises).then((data) => {
        resolve(uniq(data))
      })
    })
  })
}

export default getAllList
