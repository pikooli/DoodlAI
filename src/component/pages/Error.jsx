export  const Error =()  =>{
  return (
    <div className="h-full w-full min-h-screen bg-white bg-[url('/bg.png')] flex items-center justify-center p-8">
      <div className="max-w-lg text-center bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="text-lg mb-4">
          Please try refreshing the page. If the issue persists, please contact us at{' '}
          <a 
            href="mailto:zhangpas@gmail.com"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            zhangpas@gmail.com
          </a>
        </p>
      </div>
    </div>
  )
}