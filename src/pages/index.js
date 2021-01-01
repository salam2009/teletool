export default function IndexPage() {
    return (
        <>
            <div className='p-6 max-w-lg w-full mx-auto text-gray-700 space-y-4'>
                <h1 className='text-4xl font-extrabold text-discord-blue'>Teletool</h1>
                <p>Upload a file and enter a message to distribute to your Telegram channels.</p>
                <form action='' className='space-y-4'>
                    <input type='file' className='border p-2 block w-full rounded' />
                    <textarea type='text' className='border h-32 p-2 block w-full rounded' placeholder='Message' />
                    <input type='text' className='border p-2 block w-full rounded' placeholder='Password' />
                    <input
                        type='submit'
                        className='bg-discord-blue text-white font-medium border p-2 block w-full rounded'
                    />
                </form>
            </div>
        </>
    )
}
