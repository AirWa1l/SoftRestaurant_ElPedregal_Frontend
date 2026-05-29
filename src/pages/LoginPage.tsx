import { RecoveryPasswordForm } from '../components/recovery_password/RecoveryPasswordForm';
import { RegisterForm } from '../components/register/RegisterForm'

import { TabView, TabPanel } from 'primereact/tabview';

export function LoginPage() {
  return (
    <div className="w-full">
      <main className="min-h-screen flex flex-column md:flex-row">
        <section
          className="hidden md:flex md:w-5 flex-column justify-content-center align-items-center p-6 text-white text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}
        >
          {/* Círculos decorativos abstractos de fondo para estética premium */}
          <div className="absolute border-circle opacity-10 bg-white" style={{ width: '450px', height: '450px', top: '-15%', left: '-15%' }} />
          <div className="absolute border-circle opacity-10 bg-white" style={{ width: '350px', height: '350px', bottom: '-15%', right: '-15%' }} />

          <div className="z-1 max-w-28rem flex flex-column align-items-center">
            <span className="text-xs uppercase font-bold tracking-widest bg-white-alpha-20 px-3 py-1 border-round-2xl mb-4">
              SoftRestaurant
            </span>
            <h1 className="text-5xl font-extrabold m-0 mb-3 tracking-tight">El Pedregal</h1>
            <div className="w-4rem h-2px bg-white-alpha-40 my-3" />
            <p className="text-base line-height-3 opacity-90 m-0">
              Plataforma interna para la gestión de pedidos, productos y reportes del restaurante.
            </p>
          </div>
        </section>
        <div className="w-full md:w-7 flex align-items-center justify-content-center">
          <TabView className='bg-none w-full' style={{ background: 'none' }}>
            <TabPanel header="Login">

            </TabPanel>
            <TabPanel header="Register">
              <RegisterForm />
            </TabPanel>
            <TabPanel header="Recovery Password">
              <RecoveryPasswordForm />
            </TabPanel>
          </TabView>
        </div>

      </main>
    </div>
  )
}
