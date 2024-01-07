import React, { Suspense, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Fox from '../models/Fox';
import Loader from '../components/Loader';
import { Canvas } from '@react-three/fiber';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert';

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({name:'',email:'',message:''})
  const [isLoading, setisLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle')

  const {alert, showAlert, hideAlert} = useAlert();

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  };

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    setCurrentAnimation('run');

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name:form.name,
        to_name:"Shubham",
        from_email:form.email,
        to_email:"shubham.agnihotri1997@gmail.com",
        message:form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      ).then(()=>{
        setisLoading(false);
        showAlert({
          show:true,
          text:'Message sent Successfully!',
          type:'success'
        })
        // TODO: Show success messsage
        //TODO: Hide an alert
        setTimeout(()=>{
          hideAlert();
          setCurrentAnimation('idle')
          setForm({
            name:'',
            email:'',
            message:''
        });
        },[3000])

        setForm({name:'',email:'',message:''});
      }).catch((error)=>{
        setisLoading(false);
        setCurrentAnimation('idle');
        console.log(error);
        showAlert({
          show:true,
          text:'I didnt receive your message',
          type:'danger'
        })
        // TODO show error message
      })
  };
  return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
      {alert.show && <Alert {...alert}/>}
      {/* <Alert {...alert}/> */}
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in touch</h1>
        <form className="w-full flex flex-col gap-7 mt-14"
        onSubmit={handleSubmit}>
          <label className='text-black-500 font-semibold'>
            Name
            <input
            type='text'
            name='name'
            className='input'
            placeholder='Anamik'
            required
            value={form.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}>
            </input>
          </label>
          <label className='text-black-500 font-semibold'>
            Email ID
            <input
            type='email'
            name='email'
            className='input'
            placeholder='Anamik@gmail.com'
            required
            value={form.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}>
            </input>
          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
            name='message'
            className='input'
            placeholder='Let me know how can I help you'
            required
            value={form.message}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}>
            </textarea>
          </label>
          <button 
          type="submit"
          className='btn'
          disabled ={isLoading}
          onFocus={handleFocus}
          onBlur={handleBlur}>
            {isLoading? 'Sending...':'Send Message'}

          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas camera={{
          position:[0,0,5]
        }}>
          <directionalLight intensity={2.5} position={[0,0,1]} />
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader/>}>
            <Fox
              currentAnimation={currentAnimation}
              position = {[0.5, 0.35, 0]}
              rotation = {[12.6, -0.6, 0]}
              scale = {[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact