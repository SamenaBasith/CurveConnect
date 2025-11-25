import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function ConfirmModal({ open, onClose, onConfirm, card, form, validationErrors }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-lg font-semibold text-gray-800">Confirm Your Card</DialogTitle>
      <DialogContent className="space-y-4">
        <Card sx={{ mb: 2 }}>
          <CardMedia component="img" height="180" image={card.src} alt={card.alt} />
          <CardContent>
            <Typography className="text-gray-700 text-center">{card.alt}</Typography>
          </CardContent>
        </Card>

        <div>
          <Typography variant="subtitle2" className="font-semibold text-gray-700">To</Typography>
          <Typography className="text-gray-600">{form.recipientEmail}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2" className="font-semibold text-gray-700">Message</Typography>
          <Typography className="text-gray-600 whitespace-pre-wrap">{form.message}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2" className="font-semibold text-gray-700">Signature</Typography>
          <Typography className="text-gray-600">{form.signature}</Typography>
        </div>

        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-300 rounded-lg p-4 mt-2">
            {validationErrors.map((err, i) => (
              <div key={i} className="flex items-start gap-2 mb-1 text-red-700">
                <span className="text-red-600 font-bold">✖</span>
                <p className="text-sm">{err}</p>
              </div>
            ))}
          </div>
        )}
      </DialogContent>

      <DialogActions className="flex justify-end gap-2 p-4">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>Confirm & Send</Button>
      </DialogActions>
    </Dialog>
  );
}
