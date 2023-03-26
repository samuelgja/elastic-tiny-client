import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDirectory = path.resolve(__dirname, '..')

// getting package json and modifying it
let packageJson = JSON.parse(fs.readFileSync(path.resolve(rootDirectory, 'package.json')))

delete packageJson.devDependencies
delete packageJson.scripts
delete packageJson.main

const outputs = {}
outputs.main = 'lib/index.js'
outputs.typescript = 'src/index.ts'

packageJson = { ...outputs, ...packageJson }

const libraryPath = path.resolve(rootDirectory, 'lib')
const packageJsonPath = path.resolve(libraryPath, 'package.json')
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

// also copy readme file
const readmePath = path.resolve(rootDirectory, 'README.md')
const readmeDestinationPath = path.resolve(libraryPath, 'README.md')

fs.copyFileSync(readmePath, readmeDestinationPath)

const source = path.resolve(rootDirectory, 'src')
const sourceDestination = path.resolve(libraryPath, 'src')
fs.copySync(source, sourceDestination)
