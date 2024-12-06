'use client'

import { useState, useEffect } from 'react'

export const Detail = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-semibold">Detail Sub Kegiatan</h1>
            <p className="text-xs text-muted">kode - nama_subkegiatan</p>
            <hr className="my-4" />
        </div>
    )
}

export default Detail;