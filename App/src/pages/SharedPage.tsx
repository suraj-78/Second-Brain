import { useParams } from "react-router-dom";
import Card from "../components/CardUi/Card";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SharedPage = () => {
  const { id: userId } = useParams(); 
  const [sharedData, setSharedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/share/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch shared data");

        const jsonData = await res.json();
        setSharedData(jsonData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedData();
  }, [userId]);

  return (
    <div className="bg-slate-200 w-full min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Shared Content By Second Brain...</h1>

      {loading ? (
        <div className="text-2xl font-semibold">Loading...</div>
      ) : sharedData.length > 0 ? (
        <div className="flex flex-wrap gap-x-3 gap-y-5">
          {sharedData.map((item: any, idx: number) => (
            <Card
              key={idx}
              icon={item.contentType}
              tag={item.tag}
              title={item.title}
              link={item.link}
            />
          ))}
        </div>
      ) : (
        <div className="text-2xl font-semibold">No shared content found.</div>
      )}
    </div>
  );
};

export default SharedPage;
