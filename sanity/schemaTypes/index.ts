// import page from "./page";
import person from './documents/person'
import page from './documents/page'
import post from './documents/post'
import callToAction from './objects/callToAction'
import infoSection from './objects/infoSection'
import settings from './singletons/settings'
import link from './objects/link'
import blockContent from './objects/blockContent'
import heroType from './blocks/heroType'
import tabsType from './blocks/tabsType'
import galleryType from './blocks/galleryType'
import paragraphType from './blocks/paragraphType'
import textAndImageType from './blocks/textAndImageType'
import styleSettings from './singletons/styleSettings'
import header from './singletons/header'
import navLink from './objects/navLink'
import formType from './blocks/formType'
import metricsType from './blocks/metricsType'
import accordionType from './blocks/accordionType'

export const schemaTypes = [
  // Singletons
  settings,
  styleSettings,
  header,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  navLink,
  // Blocks
  formType,
  galleryType,
  heroType,
  paragraphType,
  tabsType,
  textAndImageType,
  metricsType,
  accordionType,
]
