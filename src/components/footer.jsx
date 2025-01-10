import React, { use } from 'react'
import classNames from 'classnames'

export default function Footer (props) {
    const { className } = props
    const baseClass = "bottom-0 w-full flex justify-center items-center py-3 bg-green-950 text-white font-xs"

    return (
        <footer className={classNames(className, baseClass)}>
            <h1>Copyright &copy; Pemerintah Kota Medan</h1>
        </footer>
    )
}
