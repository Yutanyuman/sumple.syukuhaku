"use client";
import React from "react";

function MainComponent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: "",
    checkOut: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([1600, 54000]);
  const [isDragging, setIsDragging] = useState(null);
  const handlePriceChange = (index, value) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = value;
    setPriceRange(newPriceRange);
  };
  const handleMouseDown = (index) => {
    setIsDragging(index);
  };
  const handleMouseUp = () => {
    setIsDragging(null);
  };
  const handleMouseMove = (e) => {
    if (isDragging === null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const left = rect.left;
    const x = e.clientX - left;
    const percentage = Math.min(Math.max(x / width, 0), 1);
    const value = Math.round(percentage * 52400 + 1600);

    handlePriceChange(isDragging, value);
  };

  useEffect(() => {
    if (isDragging !== null) {
      const handleGlobalMouseUp = () => {
        setIsDragging(null);
      };

      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [isDragging]);

  const handlePropertyClick = (propertyId) => {
    if (propertyId === 1) {
      window.location.pathname = "宿泊施設詳細ページ";
    }
  };
  const property = {
    id: 1,
    name: "ツリーフルツリーハウス スパイラルツリーハウス",
    location: "沖縄県名護市",
    price: 199360,
    rating: 5.0,
    reviews: 6,
    host: {
      name: "Treeful Treehouseさん",
      image: "https://picsum.photos/id/64/400/400",
      hostingSince: "ホスティング歴2年",
    },
    images: [
      "https://picsum.photos/id/866/800/600",
      "https://picsum.photos/id/871/800/600",
      "https://picsum.photos/id/874/800/600",
      "https://picsum.photos/id/877/800/600",
      "https://picsum.photos/id/883/800/600",
      "https://picsum.photos/id/888/800/600",
    ],
    amenities: [
      { name: "ログハウス", icon: "fa-house" },
      { name: "Wi-Fi", icon: "fa-wifi" },
      { name: "素晴らしいチェックイン体験", icon: "fa-key" },
      { name: "エアコン", icon: "fa-snowflake" },
      { name: "完璧なロケーション", icon: "fa-location-dot" },
      { name: "48時間前ならキャンセル無料", icon: "fa-calendar" },
    ],
    maxGuests: 6,
    bedrooms: 2,
    beds: 2,
    baths: 1,
  };
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-2xl font-bold text-[#FF5A5F] font-roboto">
              <a href="/" className="hover:opacity-80 transition-opacity">
                StayJapan
              </a>
            </h1>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="flex items-center gap-2 border rounded-full p-1.5 shadow-sm hover:shadow-md transition-shadow w-full">
                <button className="flex-1 px-3 py-0.5 text-left hover:bg-gray-100 rounded-full">
                  <div className="text-xs font-medium">目的地</div>
                  <div className="text-xs text-gray-500">行き先を入力</div>
                </button>
                <div className="h-8 w-[1px] bg-gray-300"></div>
                <button
                  className="flex-1 px-3 py-0.5 text-left hover:bg-gray-100 rounded-full"
                  onClick={() => setShowDatePicker(true)}
                >
                  <div className="text-xs font-medium">チェックイン</div>
                  <div className="text-xs text-gray-500">
                    {selectedDates.checkIn || "日付を追加"}
                  </div>
                </button>
                <div className="h-8 w-[1px] bg-gray-300"></div>
                <button
                  className="flex-1 px-3 py-0.5 text-left hover:bg-gray-100 rounded-full"
                  onClick={() => setShowDatePicker(true)}
                >
                  <div className="text-xs font-medium">チェックアウト</div>
                  <div className="text-xs text-gray-500">
                    {selectedDates.checkOut || "日付を追加"}
                  </div>
                </button>
                <div className="h-8 w-[1px] bg-gray-300"></div>
                <button className="flex-1 px-3 py-0.5 text-left hover:bg-gray-100 rounded-full">
                  <div className="text-xs font-medium">人数</div>
                  <div className="text-xs text-gray-500">ゲストを追加</div>
                </button>
                <button className="bg-[#FF5A5F] text-white p-1.5 rounded-full hover:bg-[#FF4449] ml-1">
                  <i className="fas fa-search text-sm"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:block text-gray-600 hover:text-[#FF5A5F]">
                <span className="text-sm">ホストになる</span>
              </button>
              <button className="hidden md:block bg-[#FF5A5F] text-white px-4 py-2 rounded-full hover:bg-[#FF4449]">
                <span className="text-sm">ログイン</span>
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden text-gray-600 hover:text-[#FF5A5F]"
              >
                <i className="fas fa-search text-lg"></i>
              </button>
              <button className="md:hidden text-gray-600 hover:text-[#FF5A5F]">
                <i className="fas fa-bars text-lg"></i>
              </button>
            </div>
          </div>
        </div>
        {showDatePicker && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4">
            <div className="container mx-auto max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">日付を選択</h3>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    チェックイン
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded-lg p-2"
                    value={selectedDates.checkIn}
                    onChange={(e) =>
                      setSelectedDates((prev) => ({
                        ...prev,
                        checkIn: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    チェックアウト
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded-lg p-2"
                    value={selectedDates.checkOut}
                    onChange={(e) =>
                      setSelectedDates((prev) => ({
                        ...prev,
                        checkOut: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute inset-x-0 top-0 bg-white rounded-b-2xl">
              <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="text-black hover:text-gray-700"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                  <h3 className="text-xl font-semibold">フィルター</h3>
                  <div className="w-8"></div>
                </div>
                <div className="space-y-8 pb-4">
                  <div>
                    <h4 className="text-lg font-medium mb-4">
                      宿泊施設のタイプ
                    </h4>
                    <div className="flex gap-4">
                      <button className="px-6 py-2 border rounded-full hover:border-black">
                        指定なし
                      </button>
                      <button className="px-6 py-2 border rounded-full hover:border-black">
                        ゲストルーム
                      </button>
                      <button className="px-6 py-2 border rounded-full hover:border-black">
                        まるまる貸切
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-4">価格帯</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      1泊あたりの宿泊料金（手数料および税抜き）
                    </p>
                    <div
                      className="h-24 bg-gray-100 rounded-lg relative cursor-pointer"
                      onMouseMove={handleMouseMove}
                    >
                      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2">
                        <div className="relative h-1 bg-gray-300">
                          <div
                            className="absolute h-full bg-black rounded-full"
                            style={{
                              left: `${
                                ((priceRange[0] - 1600) / 52400) * 100
                              }%`,
                              right: `${
                                100 - ((priceRange[1] - 1600) / 52400) * 100
                              }%`,
                            }}
                          />
                          {[0, 1].map((index) => (
                            <div
                              key={index}
                              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-black rounded-full cursor-grab active:cursor-grabbing"
                              style={{
                                left: `${
                                  ((priceRange[index] - 1600) / 52400) * 100
                                }%`,
                                transform: "translate(-50%, -50%)",
                              }}
                              onMouseDown={() => handleMouseDown(index)}
                            />
                          ))}
                          <div className="absolute top-8 left-0 right-0">
                            <div className="flex justify-between">
                              {Array.from({ length: 41 }, (_, i) => (
                                <div
                                  key={i}
                                  className="w-0.5 h-4 bg-[#FF5A5F]"
                                  style={{
                                    height: i % 5 === 0 ? "16px" : "8px",
                                    opacity: 0.2,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-6">
                      <div className="w-[45%]">
                        <label className="block text-sm text-gray-600 mb-1">
                          最低料金
                        </label>
                        <input
                          type="text"
                          value={`¥${priceRange[0].toLocaleString()}`}
                          className="w-full px-4 py-2 border rounded-lg"
                          readOnly
                        />
                      </div>
                      <div className="w-[45%]">
                        <label className="block text-sm text-gray-600 mb-1">
                          最高料金
                        </label>
                        <input
                          type="text"
                          value={`¥${priceRange[1].toLocaleString()}+`}
                          className="w-full px-4 py-2 border rounded-lg"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-4">部屋とベッド</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>寝室</span>
                        <div className="flex items-center gap-4">
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <i className="fas fa-minus"></i>
                          </button>
                          <span>指定なし</span>
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>ベッド</span>
                        <div className="flex items-center gap-4">
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <i className="fas fa-minus"></i>
                          </button>
                          <span>指定なし</span>
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>バスルーム</span>
                        <div className="flex items-center gap-4">
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <i className="fas fa-minus"></i>
                          </button>
                          <span>指定なし</span>
                          <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                  <div className="container mx-auto flex justify-between items-center">
                    <button className="underline font-medium">
                      すべてクリア
                    </button>
                    <button className="bg-black text-white px-8 py-3 rounded-lg">
                      1,000件以上の宿泊先を表示
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="bg-white shadow-sm border-b mt-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-4 px-6">
            <div className="overflow-x-auto scrollbar-hide flex-1">
              <div className="flex items-center space-x-10">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex flex-col items-center min-w-[72px] cursor-pointer hover:text-[#FF5A5F] transition-colors"
                  >
                    <i className={`fas ${category.icon} text-xl mb-2`}></i>
                    <span className="text-sm whitespace-nowrap">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center ml-6 pl-6 border-l min-w-[140px]">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full h-12 border rounded-lg flex items-center justify-center gap-2 bg-white hover:shadow-md transition-shadow text-base"
              >
                <i className="fas fa-sliders-h"></i>
                <span>フィルター</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="pt-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="group relative bg-white rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer"
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    className="absolute top-3 right-3 text-white hover:scale-110 transition z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      // お気に入り処理をここに追加
                    }}
                  >
                    <i className="far fa-heart text-2xl drop-shadow-lg"></i>
                  </button>
                  {property.isGuestChoice && (
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-sm shadow-md z-10">
                      ゲストチョイス
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="mt-3 p-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold group-hover:text-[#FF5A5F] transition-colors">
                      {property.name}
                    </h3>
                    <div className="flex items-center">
                      <i className="fas fa-star text-[#FF5A5F] mr-1"></i>
                      <span>{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{property.distance}</p>
                  <p className="text-gray-600 text-sm">{property.dates}</p>
                  <p className="mt-1">
                    <span className="font-semibold">
                      ¥{property.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/泊</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">サポート</h3>
              <ul className="space-y-2">
                <li>ヘルプセンター</li>
                <li>安全に関する情報</li>
                <li>キャンセルオプション</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">コミュニティ</h3>
              <ul className="space-y-2">
                <li>ご利用方法</li>
                <li>お知らせ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">ホスティング</h3>
              <ul className="space-y-2">
                <li>お部屋を掲載</li>
                <li>ホスト保証</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">企業情報</h3>
              <ul className="space-y-2">
                <li>会社概要</li>
                <li>採用情報</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p>© 2025 StayJapan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;
