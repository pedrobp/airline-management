import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren, useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

interface Props {
  open: boolean
  onClose: () => void
}

function Modal({ open, onClose, children }: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDivElement>(null)

  // When user clicks outside of the modal content, it calls onClose
  useOnClickOutside(ref, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 grid place-content-center bg-primary bg-opacity-30 z-10"
        >
          <div ref={ref}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
