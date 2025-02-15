import { addBook } from '../src/lib/books';

async function addAntifragile() {
  try {
    const book = {
      title: "Antifragile: Things That Gain From Disorder",
      author: "Nassim Nicholas Taleb",
      year_read: 2024,
      rating: 5,
      tags: ["philosophy", "complexity", "risk", "systems"],
      review: "A profound exploration of systems that benefit from volatility and stress. Taleb introduces the concept of antifragility - going beyond mere robustness to actually improve under pressure. The ideas in this book have deeply influenced my thinking about resilience and adaptability in both technology and life.",
      cover_image: "/images/antifragile.jpg"
    };

    const result = await addBook(book);
    console.log('Successfully added Antifragile:', result);
  } catch (error) {
    console.error('Failed to add Antifragile:', error);
  }
}

addAntifragile();
