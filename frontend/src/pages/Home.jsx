import ImageUploader from "@/components/ImageUploader"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Supprimer le fond d'une image
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Importe une photo, l'IA s'occupe du détourage.
        </p>
        <ImageUploader />
      </div>
    </main>
  )
}
