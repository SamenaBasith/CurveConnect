export default function CardForm({ form, onChange, onReview, onChangeTemplate, status }) {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-blue-900 font-bold mb-2">Recipient Email</label>
        <input
          type="email"
          name="recipientEmail"
          value={form.recipientEmail}
          onChange={onChange}
          className="w-full border-2 border-blue-900 rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-blue-900 font-bold mb-2">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          className="w-full border-2 border-blue-900 rounded-lg px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-blue-900 font-bold mb-2">Signature</label>
        <input
          type="text"
          name="signature"
          value={form.signature}
          onChange={onChange}
          className="w-full border-2 border-blue-900 rounded-lg px-4 py-2"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onReview}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Review & Send
        </button>
        <button
          type="button"
          onClick={onChangeTemplate}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Change Template
        </button>
      </div>

      {status && <p className="text-center mt-2 font-medium">{status}</p>}
    </form>
  );
}
