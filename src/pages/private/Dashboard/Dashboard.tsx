
import { useState } from "react";
import CardGrid from "./components/SearchCard";


const Dashboard = () => {

  const [cards, setCards] = useState([
    {
      id: '1',
      title: 'Product Design',
      description: 'Modern product design with user-centered approach',
      imageUrl: 'https://source.unsplash.com/random/400x300?design',
      tags: ['Design', 'UI/UX'],
      isFavorite: true,
    },
    {
      id: '2',
      title: 'Web Development',
      description: 'Full-stack development services',
      imageUrl: 'https://source.unsplash.com/random/400x300?web',
      tags: ['Development', 'Frontend'],
    },
    // Add more cards...
  ]);

  const ghData = [
    {
      userId: '2',
      clerkId: '3',
      username: 'janisar007',
      avatarUrl: 'https://avatars.githubusercontent.com/u/134937141?v=4',
      accUrl: 'https://github.com/janisar007',
      createdAt: "june 12",
    },
    {
      userId: '6',
      clerkId: '3',
      username: 'janisar007',
      avatarUrl: 'https://avatars.githubusercontent.com/u/134937141?v=4',
      accUrl: 'https://github.com/janisar007',
      createdAt: "june 12",
    },
    {
      userId: '4',
      clerkId: '3',
      username: 'janisar007',
      avatarUrl: 'https://avatars.githubusercontent.com/u/134937141?v=4',
      accUrl: 'https://github.com/janisar007',
      createdAt: "june 12",
    },
  ]

  const handleFavorite = (cardId: string) => {
    setCards(cards.map((card:any) => 
      card.id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
    ));
  };

  return (
    <div className="flex flex-col p-4 bg-white h-[calc(100vh-7rem)]">
      <div className="p-4border-2">
      <CardGrid
        cards={ghData}
        onFavorite={handleFavorite}
        onBookmark={(cardId) => console.log('Bookmark', cardId)}
        onShare={(cardId) => console.log('Share', cardId)}
        onCardClick={(card) => console.log('Card clicked', card)}
        className="max-w-[84rem] mx-auto bg-white"
        cardClassName="cursor-pointer bg-white"
        searchPlaceholder="Search projects..."
        emptyMessage="No matching projects found"
      />
    </div>
    </div>
  );
};

export default Dashboard;