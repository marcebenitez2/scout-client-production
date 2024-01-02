import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Notificacion({ noti, modal, seleccionada }) {
  const seleccionar = (x) => {
    modal(true);
    seleccionada(noti);
  };

  return (
    <article
      className={`w-full h-full flex flex-col items-center gap-4 rounded-xl text-white py-2 px-2 justify-between ${
        noti.active != 1 ? "bg-custon-red" : "bg-custon-brow"
      }`}
    >
      <div className="w-full flex justify-between">
        <span>{noti.date.substring(5, 10)}</span>
        <h3 className="text-lg font-semibold">{noti.name}</h3>
        {noti.active === false ? (
          <span className="text-lg font-semibold">Visto</span>
        ) : (
          <AiOutlineCheckCircle
            className="cursor-pointer"
            size={"25px"}
            onClick={() => seleccionar()}
          />
        )}
      </div>
      <p>{noti.message}</p>
      <div className="w-full flex justify-between flex-wrap">
        <span className="text-sm font-semibold">{noti.mail}</span>
        <span className="text-sm font-semibold">{noti.tel}</span>
      </div>
    </article>
  );
}

export default Notificacion;
