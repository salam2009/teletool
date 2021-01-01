import { useState } from 'react'
import Axios from 'axios'

export default function IndexPage() {
    const [file, setFile] = useState('')
    const [message, setMessage] = useState('')
    const [password, setPassword] = useState('')

    const ready = file && message && password

    const submit = (e) => {
        e.preventDefault()

        if (!ready) return

        let formData = new FormData()
        formData.append('file', file)
        formData.append('message', message)
        formData.append('password', password)

        Axios.post('/api/send', formData)
            .then((res) => {
                alert('Your file has been sent.')
                setFile('')
                setMessage('')
                setPasswrd('')
            })
            .catch((error) => {
                alert(error.response.data || 'An error has occurred. Check the console for more information.')
            })
    }

    return (
        <>
            <div className='p-6 max-w-lg w-full mx-auto text-gray-700 space-y-4'>
                <h1 className='text-4xl font-extrabold text-discord-blue'>Teletool</h1>
                <p>Upload a file and enter a message to distribute to your Telegram channels.</p>
                <form onSubmit={submit} className='space-y-4'>
                    <input
                        type='file'
                        onChange={(e) => {
                            setFile(e.target.files[0])
                        }}
                        className='overflow-hidden border p-2 block w-full rounded'
                    />
                    <textarea
                        type='text'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='border h-32 p-2 block w-full rounded'
                        placeholder='Message'
                    />
                    <input
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border p-2 block w-full rounded'
                        placeholder='Password'
                    />
                    <input
                        type='submit'
                        className={`${
                            ready ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
                        } bg-discord-blue text-white font-medium border p-2 block w-full rounded`}
                    />
                </form>
            </div>
        </>
    )
}
