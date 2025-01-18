// Sample recommendations data
export const recommendations = [
    {
    coordinate: {
      latitude: 1.3521,
      longitude: 103.8198,
    },
    place_id: "ChIJdTAj-5kb2jERWjOtgpDiGRY",
    name: "fishball noodles",
    cuisine: "Italian",
    friendList: [
      { friendName: "Alice" },
      { friendName: "Bob" },
    ],
    friendListReview: [
      { friendName: "Alice", review: "Great pasta, loved the vibe!", rating: true },
      { friendName: "Bob", review: "Pizza was decent, but too pricey.", rating: false },
    ],
  },
  {
    coordinate: {
      latitude: 1.33,
      longitude: 103.8198,
    },
    place_id: "ChIJ1X6_w6ob2jERrqTU7rpXt9U",
    name: "mala",
    cuisine: "Chinese",
    friendList: [
      { friendName: "Charle" },
      { friendName: "Dillon" },
    ],
    friendListReview: [
      { friendName: "Charle", review: "Slay food!", rating: true },
      { friendName: "Dillon", review: "Wanton noodle good", rating: true },
    ],
  }

]