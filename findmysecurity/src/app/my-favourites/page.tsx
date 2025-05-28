"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TargetUser {
  id: number;
  firstName: string;
  lastName: string;
  screenName: string;
  profile: {
    image?: string;
  } | null;
}

interface FavoriteItem {
  id: number;
  requesterId: number;
  targetUserId: number;
  targetUser: TargetUser;
  createdAt: string;
}

const FavoriteListPage = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const userId = JSON.parse(localStorage.getItem("loginData") || "{}").id;
    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");

    if (!userId || !token) {
      localStorage.clear();
      router.push("/signin");
      return;
    }

    try {
      const response = await axios.get(
        `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (targetUserId: number) => {
    const userId = JSON.parse(localStorage.getItem("loginData") || "{}").id;
    const token = localStorage.getItem("authToken")?.replace(/^"|"$/g, "");

    if (!userId || !token) {
      localStorage.clear();
      router.push("/signin");
      return;
    }

    try {
      await axios.delete(
        `https://ub1b171tga.execute-api.eu-north-1.amazonaws.com/dev/favorites/${userId}/target/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavorites((prev) =>
        prev.filter((item) => item.targetUserId !== targetUserId)
      );
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <main className="min-h-screen bg-white mt-20 text-black p-6 md:p-12">
      <h1 className="text-3xl font-bold mb-8 border-b border-white pb-2">
        My Favorites
      </h1>

      {loading ? (
        <p className="text-white text-lg">Loading...</p>
      ) : favorites.length === 0 ? (
        <p className="text-white text-lg">No favorites found.</p>
      ) : (
        <div className="grid gap-6">
          {favorites.map((item) => {
            const profileImage =
              item.targetUser.profile?.image ||
              "/images/profile.png";

            return (
              <div
                key={item.id}
                className="bg-white text-black p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
                  <img
                    src={profileImage}
                    alt={`${item.targetUser.firstName} ${item.targetUser.lastName}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-black"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.targetUser.firstName} {item.targetUser.lastName}
                    </h2>
                    <p className="text-gray-700 text-sm">{item.targetUser.screenName}</p>
                  </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => router.push(`/public-profile/${item.targetUser.id}`)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => removeFavorite(item.targetUser.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default FavoriteListPage;
