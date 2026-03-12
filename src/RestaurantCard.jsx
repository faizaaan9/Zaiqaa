import { useNavigate } from "react-router-dom";
import { Star, Clock, Heart, Leaf } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function RestaurantCard({ restaurant: r }) {
  const navigate = useNavigate();
  const { user, userProfile, refreshProfile } = useAuth();
  const [faved, setFaved] = useState(userProfile?.favourites?.includes(r.id));
  async function toggleFav(e) {
    e.stopPropagation();
    await updateDoc(doc(db,"users",user.uid), { favourites: faved ? arrayRemove(r.id) : arrayUnion(r.id) });
    setFaved(!faved); refreshProfile();
  }
  return (
    <div onClick={() => r.isOpen && navigate(`/restaurant/${r.id}`)} className={`card card-hover cursor-pointer group overflow-hidden ${!r.isOpen?"opacity-60 cursor-not-allowed":""}`}>
      <div className="relative h-44 overflow-hidden">
        <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"/>
        {r.discount && <div className="absolute top-3 left-3 bg-gold-500 text-z-950 text-xs font-bold px-2.5 py-1 rounded-xl">{r.discount}</div>}
        {!r.isOpen && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="bg-white text-gray-800 text-sm font-bold px-4 py-2 rounded-xl">Closed</span></div>}
        {r.isHalal && <div className="absolute bottom-3 left-3"><span className="halal-badge">🌙 Halal</span></div>}
        <button onClick={toggleFav} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform">
          <Heart className={`w-4 h-4 ${faved?"fill-red-500 text-red-500":"text-gray-400"}`}/>
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-z-900 text-base leading-snug">{r.name}</h3>
            <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[180px]">{r.cuisine}</p>
          </div>
          {r.isVeg && <div className="flex-shrink-0 bg-green-50 border border-green-200 rounded-lg px-2 py-0.5 flex items-center gap-1"><Leaf className="w-3 h-3 text-green-700"/><span className="text-green-800 text-[10px] font-bold">VEG</span></div>}
        </div>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1 bg-z-50 px-2 py-0.5 rounded-lg"><Star className="w-3 h-3 fill-z-600 text-z-600"/><span className="text-z-700 text-xs font-bold">{r.rating}</span></div>
          <div className="flex items-center gap-1 text-gray-400 text-xs"><Clock className="w-3 h-3"/>{r.deliveryTime}</div>
          <div className="ml-auto text-xs">{r.deliveryFee===0?<span className="text-z-600 font-bold">FREE delivery</span>:<span className="text-gray-400">₹{r.deliveryFee} delivery</span>}</div>
        </div>
        {r.tags?.length>0 && <div className="flex flex-wrap gap-1 mt-2">{r.tags.map(t=><span key={t} className="bg-z-50 text-z-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-z-100">{t}</span>)}</div>}
      </div>
    </div>
  );
}
