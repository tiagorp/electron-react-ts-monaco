import React from 'react'
import ReactDOM from 'react-dom'

import Editor from '@monaco-editor/react'
import { loader } from '@monaco-editor/react'
import path from 'path'

function App() {
    // function ensureFirstBackSlash(str: string) {
    //     return str.length > 0 && str.charAt(0) !== '/' ? '/' + str : str
    // }

    // function uriFromPath(_path: string) {
    //     const pathName = path.resolve(_path).replace(/\\/g, '/')
    //     return encodeURI('file://' + ensureFirstBackSlash(pathName))
    // }

    // loader.config({
    //     paths: {
    //         vs: uriFromPath(
    //             path.join('C:/Users/tpinh/github/electron-react-ts-boilerplate', '/node_modules/monaco-editor/min/vs')
    //         ),
    //     },
    // })

    loader.config({
        paths: {
            vs: './node_modules/monaco-editor/min/vs',
        },
    })

    return <Editor height='90vh' defaultLanguage='javascript' defaultValue='// some comment' />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
