import React from 'react';
import errorpic from '../../../public/errorpic-removebg-preview.png';

export default function ModalTailwind({ ModalTitle, body }) {
  const [showModal, setShowModal] = React.useState(true);

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 h-2/3 my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-red-500 ">
                  <h3 className="text-3xl font-semibold text-center w-full ">{ModalTitle}</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none transform transition-transform duration-200 hover:scale-110 hover:rotate-6 hover:text-white"
                    onClick={() => setShowModal(false)}>
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative  flex-auto text-center">
                  <div
                    className=" h-full"
                    style={{
                      backgroundImage: `url(${errorpic})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'contain'
                    }}>
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{body}</p>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
