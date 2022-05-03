import { Cloudinary } from "@cloudinary/url-gen";

export const BASEURL = 'http://127.0.0.1:5001/api/v1/zhik/store/commerce/'
export const IMAGEKIT_CUSTOMER_BASEURL = 'https://ik.imagekit.io/zalajobi/zhik-store-profile/'
export const IMAGEKIT_PUBLIC_KEY = 'public_cMLW/yO+SwcUyNciAsBgMY8tq5E='
export const IMAGEKIT_PRIVATE_KEY = 'private_prDlb8HOrY9Z/mfviw2HLtd93r0='
export const CLOUDINARY_KEY = '419976814271589'
export const CLOUDINARY_SECRET = 'tSbI9om-kAb9aqd-Xa4hejtCSaE'
export const CLOUDINARY_URL='cloudinary://419976814271589:tSbI9om-kAb9aqd-Xa4hejtCSaE@zalajobi'
export const CLOUDINARY_NAME = 'zalajobi'

const cloudinaryObject = new Cloudinary({
  cloud: {
    cloudName: 'zalajobi'
  },
  url: {
    secureDistribution: 'www.example.com',
    secure: true
  }
});