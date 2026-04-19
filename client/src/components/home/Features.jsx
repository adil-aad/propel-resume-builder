import React from "react"
import {Zap} from 'lucide-react'
import Title from "./Title";

const Features = () => {
    const [isHover, setIsHover] = React.useState(false);

    return (
        <div id="features" className="flex flex-col items-center py-20 px-6 md:px-12 lg:px-20 scroll-mt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Zap width={14} className="text-cyan-400"/>
                <span className="text-sm font-medium text-gray-200">Simple Process</span>
            </div>

            <Title 
                title='Build your resume' 
                description='Build standout, ATS-friendly resumes in minutes with smart AI suggestions, polished templates, and effortless customization'
            />
            
            <div className="flex flex-col md:flex-row items-center justify-center xl:-mt-10">
                <img className="max-w-2xl w-full xl:-ml-32 opacity-80" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm ${!isHover ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 shadow-xl' : 'group-hover:bg-gradient-to-br group-hover:from-cyan-500/30 group-hover:to-cyan-600/20 group-hover:border-cyan-400/40 group-hover:shadow-cyan-500/20 group-hover:-translate-y-1'} flex gap-4`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-cyan-400"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-white">Real-Time Analytics</h3>
                                <p className="text-sm text-gray-300 max-w-xs">Get instant insights into your finances with live dashboards.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 shadow-xl group-hover:bg-gradient-to-br group-hover:from-purple-500/30 group-hover:to-purple-600/20 group-hover:border-purple-400/40 group-hover:shadow-purple-500/20 group-hover:-translate-y-1 flex gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-purple-400"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-white">Bank-Grade Security</h3>
                                <p className="text-sm text-gray-300 max-w-xs">End-to-end encryption, 2FA, compliance with GDPR standards.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm bg-gradient-to-br from-pink-500/20 to-pink-600/10 border-pink-500/30 shadow-xl group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:to-pink-600/20 group-hover:border-pink-400/40 group-hover:shadow-pink-500/20 group-hover:-translate-y-1 flex gap-4">
                            <svg className="size-6 text-pink-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-white">Customizable Reports</h3>
                                <p className="text-sm text-gray-300 max-w-xs">Export professional, audit-ready financial reports for tax or internal review.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&display=swap');
                * {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
        </div>
    );
};

export default Features;