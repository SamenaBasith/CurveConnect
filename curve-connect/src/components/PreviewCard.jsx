export default function PreviewCard({ card }) {
  if (!card) return null;

  return (
    <div className="mb-6">
      <img 
      src={card.src} 
      alt={card.alt} 
      className="w-full object-contain h-50" />
      <div className="p-2 text-center font-bold text-blue-800">{card.alt}</div>
    </div>
  );
}
