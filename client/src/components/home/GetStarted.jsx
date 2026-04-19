const GetStarted = () => {
    return (
        <div id='cda' className='w-full'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-y border-white/10 py-16 sm:py-20 px-6 md:px-12 lg:px-20">
                <p className="text-xl md:text-2xl font-semibold max-w-md bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mx-auto md:mx-0">
                    Create a Professional Resume In Minutes and Apply With Confidence
                </p>
                <a href="https://prebuiltui.com" className="flex items-center gap-2 rounded-full py-3 px-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-white font-medium group mx-auto md:mx-0">
                    <span>Get Started Free</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>
    )
}

export default GetStarted