/* eslint-disable */
var gulp = require('gulp')
var tap = require('gulp-tap')
var fs = require('fs')

const SOURCE_PATH = './src'
const DEST_PATH = './dist'

function copyAppJson() {
  return gulp.src(`${SOURCE_PATH}/app.json`)
    .pipe(tap(function(_, t) {
      return t.through(gulp.dest, [DEST_PATH])
    }))
}

function copyMockJson() {
  const mockPath = `${SOURCE_PATH}/mock.json`
  return fs.existsSync(mockPath) ? gulp.src(mockPath)
    .pipe(tap(function(_, t) {
      return t.through(gulp.dest, [DEST_PATH])
    }))
    : Promise.resolve()
}

function copyPageJson() {
  return gulp.src(`${SOURCE_PATH}/pages/**/*.json`)
    .pipe(tap(function(_, t) {
      return t.through(gulp.dest, [`${DEST_PATH}/pages`])
    }))
}

function copyAssets () {
  const getSrcPath = (path) => {
    return SOURCE_PATH + (path.startsWith('/') ? path : ('/' + path))
  }
  const appJson = JSON.parse(fs.readFileSync(`${SOURCE_PATH}/app.json`, 'utf-8'));
  let assetsPath = []
  if (appJson.headerImage) {
    assetsPath.push(getSrcPath(appJson.headerImage))
  }
  if (appJson.previewImages && appJson.previewImages.length > 0) {
    const previewAssets = appJson.previewImages.reduce((res, cur) => {
      res.push(getSrcPath(cur))
      return res
    }, [])
    assetsPath = assetsPath.concat(previewAssets)
  }
  if (appJson.tabBar && appJson.tabBar.list && appJson.tabBar.list.length > 0) {
    const tabAssets = appJson.tabBar.list.reduce((res, cur) => {
      if (cur.iconPath && cur.iconPath.length > 0) {
        res.push(getSrcPath(cur.iconPath))
      }
      if (cur.selectedIconPath && cur.selectedIconPath.length > 0) {
        res.push(getSrcPath(cur.selectedIconPath))
      }
      return res
    }, [])
    assetsPath = assetsPath.concat(tabAssets)
  }
  if (assetsPath.length) {
    return gulp.src(assetsPath).pipe(gulp.dest(`${DEST_PATH}/assets`))
  } else {
    return Promise.resolve('no assets to copy')
  }
}

gulp.task('default', gulp.parallel(copyAppJson, copyMockJson, copyPageJson, copyAssets))
