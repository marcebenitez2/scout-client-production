import React from 'react'
import Formulario from '../components/formulario'
import InfoNav from '../components/infoNav'

function Consulta() {
    return (
        <main className="w-screen h-screen bg-custon-white bg-gradient-to-t from-red-200 to-red-600">
        <InfoNav />
        <section className="pt-20 w-full flex flex-col px-10 gap-12 items-center">
          <div className="font-semibold text-white text-center">
            <h2 className="text-5xl">Grupo scout</h2>
            <h1 className="text-7xl">San Miguel de Arcangel</h1>
          </div>
          <Formulario/>
        </section>
      </main>
    )
}

export default Consulta
