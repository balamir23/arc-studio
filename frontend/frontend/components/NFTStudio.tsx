"use client";

export default function NFTStudio() {
  return (
    <div className="rounded-xl border p-6 mt-6">
      <h2 className="text-2xl font-bold mb-6">
        NFT Studio
      </h2>

      <form className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">
            NFT Name
          </label>

          <input
            type="text"
            placeholder="My NFT"
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            NFT Symbol
          </label>

          <input
            type="text"
            placeholder="MNFT"
            className="w-full rounded border p-3"
          />
        </div>

        <button
          type="button"
          className="rounded bg-black px-5 py-3 text-white"
        >
          Create NFT Collection
        </button>
      </form>
    </div>
  );
}