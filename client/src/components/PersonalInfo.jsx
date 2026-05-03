import { BriefcaseBusiness, Globe, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfo = ({data, onChange, removeBackground, setRemoveBackground}) => {

    const handleChange = (field, value) =>{
        onChange({...data, [field]: value})
    }

    const fields = [
        {key: 'full_name', label: 'Full Name', icon: User, type: "text", required: "true"},
        {key: 'email', label: 'Email Adress', icon: Mail, type: "email", required: "true"},
        {key: 'phone', label: 'Phone Number', icon: Phone, type: "tel"},
        {key: 'location', label: 'Location', icon: MapPin, type: "text"},
        {key: 'profession', label: 'Profession', icon: BriefcaseBusiness, type: "text"},
        {key: 'linkedin', label: 'LinkedIn Profile', icon: Globe, type: "url"},
        {key: 'website', label: 'personal Website', icon: Globe, type: "url"},
    ]
  return (
    <div>
        <h3 className='text-lg font-semibold text-gray-900'>Peronal Information</h3>
        <p className='text-sm text-gray-600'>Get Started With Your Informaiton</p>

        <div className='flex items-center gap-2'>
            <label>
                {data.image ? (
                    <img src={typeof data.image == 'string' ?
                         data.image : URL.createObjectURL(data.image)} alt="image" className='mt-5 h-16 w-16
                         rounded-full object-cover ring-2 ring-slate-200 transition hover:opacity-90'/>
                ): (
                    <div className='mt-5 inline-flex cursor-pointer items-center gap-3 text-slate-600
                     transition hover:text-slate-800'>
                        <User className='h-12 w-12 rounded-full border border-slate-300 p-2.5'/>
                        Upload User Image
                    </div>
                )}

                <input type="file" accept='image/jpeg, image/png' className='hidden' onChange={(event)=>handleChange("image", event.target.files[0])} />
            </label>

            {typeof data.image === 'object' && (
                <div className='flex flex-col gap-1 pl-4 text-sm text-slate-700'>
                    <p>Remove Background</p>
                    <label className='relative inline-flex items-center gap-3 cursor-pointer text-slate-900'>
                        <input type="checkbox" className='sr-only peer' onChange={()=>setRemoveBackground(prev => !prev)} checked={removeBackground} />

                        <div className='h-5 w-9 rounded-full bg-slate-300 peer-checked:bg-green-600
                        transition-colors duration-200'>

                        </div>

                        <span className='absolute left-1 top-1 h-3 w-3 rounded-full bg-white
                        transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>

                    </label>
                </div>
            )}

        </div>
        {fields.map((field)=>{
            const Icon = field.icon;
            return (
                <div key={field.key} className='space-y-2 mt-5'>
                    <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                        <Icon className='size-4'/>
                        {field.label}
                        {field.required && <span className='text-red-500'>*</span>}
                    </label>

                    <input type={field.type} value={data[field.key] || ""}
                    onChange={(e)=>handleChange(field.key, e.target.value)} className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200'/>

                </div>
            )
        })}

        <button
            type='button'
            className='mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
        >
            Save Changes
        </button>

    </div>
  )
}

export default PersonalInfo
