import { X } from 'lucide-react'
import { Button, Modal } from '..'
import { Flight } from '../../types'

interface Props {
  flightToRemove: Flight | null
  subsequentialFlights: Flight[]
  onClose: () => void
  onConfirm: () => void
}

function RemoveModal({ flightToRemove, subsequentialFlights, onClose, onConfirm }: Props) {
  return (
    <Modal open={!!flightToRemove} onClose={onClose}>
      <div className="bg-white bg-opacity-100 rounded-md p-6 flex flex-col gap-4 drop-shadow-lg max-w-[300px] xl:max-w-[400px]">
        <div className="flex items-center">
          <span className="flex-1 font-bold text-primary text-lg">Attention</span>

          <Button variant="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        <span className="text-primary text-lg">
          Are you sure you want to remove the flight <b>{flightToRemove?.ident}</b> from the rotation?
        </span>

        {!!subsequentialFlights.length && (
          <div className="flex flex-col gap-1 text-sm text-secondary">
            <span>This will cause the subsequential flights to also be removed:</span>

            <ul className="ml-5">
              {subsequentialFlights.map((f) => (
                <li key={f.ident}>{f.ident}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="self-end flex items-center gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </div>
      </div>
    </Modal>
  )
}

export default RemoveModal
