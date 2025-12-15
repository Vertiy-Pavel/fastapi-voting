import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect } from 'react'

const Modal = ({ open, onClose, title, children, className = '', closeOnBackdropClick = true }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape' && open) onClose?.() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open, onClose])

    return (
        <Dialog
            open={open}
            as="div"
            className={`relative z-50 focus:outline-none ${className}`}
            onClose={(v) => closeOnBackdropClick && onClose?.(v)}
        >
            {/* Фон (Backdrop) */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0"
                aria-hidden="true"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <DialogPanel
                        transition
                        className="
                            relative w-full max-w-lg transform overflow-hidden rounded-2xl
                            bg-white p-6 text-left align-middle shadow-xl transition-all
                            duration-300 ease-out
                            data-[closed]:scale-95 data-[closed]:opacity-0
                        "
                    >
                        <div className="flex items-center justify-between mb-4">
                            {title && (
                                <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                    {title}
                                </DialogTitle>
                            )}

                            <button
                                type="button"
                                className="rounded-md bg-transparent cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none"
                                onClick={() => onClose?.()}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-2 text-gray-500">
                            {children}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default Modal;