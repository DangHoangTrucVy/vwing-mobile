import { CropSolution, NewsArticle, TelemetryMission } from "../types/index";

export const cropSolutions: CropSolution[] = [
  {
    id: "durian",
    name: "Sầu Riêng",
    subName: "(Musang King & Ri6)",
    badge: "BẬC THẦY TÁN CAO & NHẠY CẢM PHÂN GỐC",
    title: "Quản Lý Từng Cây Sầu Riêng Bằng Căn Cước Số AI",
    description:
      "Theo dõi chu kỳ làm bông, nuôi trái, tỷ lệ rụng sinh lý và tầm soát hiện tượng xì mủ rễ Phytophthora. Giúp nông hộ giảm 38% chi phí thuốc BVTV và tăng 22% tỷ lệ trái loại 1.",
    stats: [
      { label: "Năng suất trái xuất khẩu", value: "+22%", isPositive: true },
      { label: "Lượng thuốc xịt dư thừa", value: "-38%", isPositive: false },
    ],
    pilotPlot: {
      title: "Khối Vườn Thí Điểm 120ha - Cư M'gar",
      subtitle: "3,400 cây sầu riêng Ri6 & Monthong gắn thẻ định vị GPS RTK",
      soilMoisture: "68%",
      treeCount: "3,400 gốc định danh",
      gpsStatus: "RTK Sub-cm",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg9d9FUl5dbZU9VnjuNDMRR7c_r4FEBA6ZLu6jZuCBPOQXQaUm2QwvkSCo&s=10",
    },
  },
  {
    id: "coffee",
    name: "Cà Phê & Hồ Tiêu",
    subName: "(Robusta & Tiêu Vĩnh Linh)",
    badge: "KIỂM SOÁT THẢM PHỦ & RỆP SÁP RỄ",
    title: "Bản Đồ Chỉ Số Thủy Vận & Dinh Dưỡng Đất Đồi Dốc",
    description:
      "Định lượng chỉ số thiếu nước mặt tầng sâu và phát hiện sớm hiện tượng vàng lá thối rễ tuyến trùng trên diện rộng. Tối ưu chu kỳ tưới nhỏ giọt tiết kiệm 45% điện nước tưới tiêu.",
    stats: [
      { label: "Tiết kiệm nước & năng lượng", value: "-45%", isPositive: true },
      { label: "Tỷ lệ hạt chắc loại A", value: "+18.5%", isPositive: true },
    ],
    pilotPlot: {
      title: "Nông Trường Cà Phê Chư Prông - Gia Lai",
      subtitle: "85ha Robusta cao sản canh tác theo chuẩn Rainforest Alliance",
      soilMoisture: "54%",
      treeCount: "28,000 bụi cà phê",
      gpsStatus: "RTK Sub-cm",
      image: "https://giacaphe.com/wp-content/uploads/2011/04/vuon-tieu1.jpg",
    },
  },
  {
    id: "avocado",
    name: "Bơ Booth & Macca",
    subName: "(Bơ 034, Booth 7 & Macadamia)",
    badge: "PHÂN TÍCH QUANG HỢP TÁN RẬM",
    title: "Tối Ưu Tỉa Cành Đoán Sản Lượng Bằng LiDAR 3D",
    description:
      "Mô phỏng 3D thể tích tán để khuyến nghị vị trí tỉa cành tạo tán đón nắng. Dự báo sớm sản lượng thu hoạch trước 45 ngày với sai số dưới 5% phục vụ ký kết hợp đồng xuất khẩu.",
    stats: [
      {
        label: "Độ chính xác dự báo sản lượng",
        value: "96.2%",
        isPositive: true,
      },
      { label: "Hiệu quả hấp thu ánh sáng", value: "+31%", isPositive: true },
    ],
    pilotPlot: {
      title: "Vườn Thực Nghiệm Macca Bảo Lộc - Lâm Đồng",
      subtitle:
        "64ha Macca và Bơ ghép canh tác theo hướng hữu cơ xuất khẩu Nhật",
      soilMoisture: "62%",
      treeCount: "1,950 cây thụ phấn",
      gpsStatus: "RTK Sub-cm",
      image:
        "https://noomfood.com/wp-content/uploads/2025/03/noom-cay-macca-190325-11.jpg",
    },
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: "vnexpress-01",
    publisher: "VnExpress Nông Nghiệp",
    date: "18/02/2026",
    title:
      "Giải pháp viễn thám số hóa hơn 60.000 ha sầu riêng xuất khẩu Tây Nguyên",
    summary:
      "VWING mang đến lời giải cho việc kiểm soát nấm xì mủ diện rộng mà mắt thường không thể quan sát kịp trên các vùng trồng hàng trăm hecta.",
    category: "Báo chí chính thống",
    readTime: "4 phút",
    content: [
      "Tại các thủ phủ sầu riêng như Krông Pắc (Đắk Lắk) hay Di Linh (Lâm Đồng), việc canh tác cây ăn trái giá trị cao đang bước vào kỷ nguyên số hóa mạnh mẽ.",
      "Bằng việc triển khai đội bay drone mang cảm biến đa phổ quét 5 dải sóng quang học, hệ thống VWING có thể nhận diện sớm sự suy giảm sắc tố diệp lục khi nấm Phytophthora mới chỉ bắt đầu xâm nhiễm tầng biểu bì rễ và thân.",
      "Điều này giúp nông dân khoanh vùng và dập dịch ngay từ 2-3 cây đầu tiên thay vì phải phun tràn lan hàng hecta, tiết kiệm hàng chục triệu đồng tiền thuốc BVTV mỗi đợt.",
    ],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdFts_z7gn4Qqt7Scdbuk9bHyKTgGpRdYC2rupzkw0Ig&s=10",
  },
  {
    id: "tapchi-nn-02",
    publisher: "Tạp chí Nông Nghiệp & PTNT",
    date: "12/01/2026",
    title: "Đột phá mô hình 3D Terrain Follow cho nông nghiệp cây công nghiệp",
    summary:
      "Nghiên cứu ứng dụng radar độ cao vi sai kết hợp cảm biến siêu thanh trên địa hình sườn dốc hiểm trở của vùng cao nguyên.",
    category: "Nghiên cứu khoa học",
    readTime: "6 phút",
    content: [
      "Khác với ruộng đồng bằng phẳng ở Đồng bằng Sông Cửu Long, địa hình Tây Nguyên đặc trưng bởi các đồi dốc từ 15° đến hơn 40° xen kẽ cây che bóng.",
      "Cơ chế bay bám địa hình thích ứng thời gian thực (Terrain-Follow) của VWING duy trì khoảng cách vòi phun chính xác 1.5m so với ngọn cây trong suốt hành trình bay.",
      "Kết quả đo đạc thực địa cho thấy độ đồng đều của giọt thuốc tăng 88%, giảm thiểu 95% hiện tượng giọt thuốc bay tạt ra ngoài theo gió đồi.",
    ],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWhN8Cx_UyEt034CQ6i6Hq3oQds30lKkUsRfcAlXePrg&s=10",
  },
  {
    id: "agritech-asia-03",
    publisher: "AgriTech Asia Review",
    date: "04/01/2026",
    title:
      "Top 10 sáng kiến công nghệ nông nghiệp chính xác nổi bật Đông Nam Á",
    summary:
      "VWING được vinh danh nhờ giải pháp gắn căn cước số GPS RTK cho từng thân cây cổ thụ và cây lâu năm xuất khẩu.",
    category: "Báo cáo quốc tế",
    readTime: "5 phút",
    content: [
      "Giải thưởng AgriTech Innovation Award 2026 ghi nhận đóng góp của giải pháp gắn thẻ định danh cây trồng thân gỗ của VWING.",
      "Mỗi cây trồng có một hộ chiếu số riêng biệt ghi nhận lịch sử xử lý ra hoa, tỷ lệ đậu quả, chỉ số sinh khối lá và lượng phân vi sinh hấp thụ.",
      "Dữ liệu được lưu trữ trên sổ cái minh bạch, đáp ứng tuyệt đối các tiêu chuẩn kiểm dịch và mã số vùng trồng khắt khe khi xuất khẩu sang Trung Quốc, EU và Hoa Kỳ.",
    ],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRckFdwq694mirxWXbvvxBn4KlW8Oz-IhRP_1znDej5OSi_zYBF6BdvQVw&s=10",
  },
  {
    id: "tuoitre-04",
    publisher: "Báo Tuổi Trẻ",
    date: "28/01/2026",
    title:
      "Số hóa từng thân cây lâu năm: Khi nông dân làm chủ bản đồ đa phổ NDVI",
    summary:
      "Nông hộ Đắk Lắk ứng dụng smartphone kết nối trạm bay VWING để chủ động theo dõi chỉ số diệp lục và khoảng chất của vườn cây mỗi sáng.",
    category: "Phóng sự đời sống",
    readTime: "3 phút",
    content: [
      'Ông Nguyễn Văn Thắng (xã Ea Yông, huyện Krông Pắc) chia sẻ: "Trước đây mỗi lần nghi ngờ cây bị bệnh là phải lội bộ khắp 8ha đồi để vạch từng chùm lá. Giờ chỉ cần mở ứng dụng là thấy ngay cây số 142 ở hàng 18 đang bị stress quang học, ra tận nơi kiểm tra đúng y như rằng xì mủ dưới cổ rễ."',
      "Việc minh bạch hóa dữ liệu còn giúp các hợp tác xã dễ dàng tiếp cận các nguồn vốn tín dụng xanh và bảo hiểm nông nghiệp có định giá minh bạch.",
    ],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc2O_66AAwJnIp1LINCqqi1XekznyvlZ4CEld3liokIA&s=10",
  },
  {
    id: "kinhte-sg-05",
    publisher: "Tạp chí Kinh Tế Sài Gòn",
    date: "08/02/2026",
    title:
      "Ứng dụng Drone & AI: Bài toán tối ưu 38% chi phí vật tư cho thủ phủ sầu riêng",
    summary:
      "Phân tích hiệu quả tài chính của việc chuyển đổi từ phun đại trà sang lập trình bay phun định vị chính xác từng cụm tán nhiễm bệnh.",
    category: "Phân tích tài chính",
    readTime: "4 phút",
    content: [
      "Theo khảo sát tại 42 hợp tác xã nông nghiệp ứng dụng hệ thống viễn thám VWING trong vụ mùa 2025-2026, chi phí vật tư nông nghiệp trung bình giảm từ 82 triệu đồng/ha/năm xuống còn 50.8 triệu đồng/ha/năm.",
      "Sự sụt giảm chi phí này chủ yếu nhờ hạn chế 70% các đợt phun phòng ngừa vô tội vạ và tập trung điều trị trúng đích.",
    ],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJHUdtDpXMAsf90GXOq67zs_k5fLznEtaQ5QgMT82Y_w&s=10",
  },

  {
    id: "drone-ai-06",
    publisher: "VWING AgriTech Insights",
    date: "15/03/2026",
    title: "Drone và AI: Xu hướng mới trong giám sát sức khỏe vườn cây ăn trái",
    summary:
      "Khám phá cách ảnh chụp từ drone và trí tuệ nhân tạo hỗ trợ phát hiện sớm những vùng cây có dấu hiệu bất thường, giúp nhà vườn chủ động kiểm tra và chăm sóc.",
    category: "Công nghệ nông nghiệp",
    readTime: "5 phút",
    imageUrl:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900",
    content: [
      "Drone đang mở ra cách tiếp cận mới trong việc theo dõi những vườn cây có diện tích lớn. Thay vì kiểm tra từng khu vực bằng phương pháp thủ công, nhà vườn có thể thu thập hình ảnh từ trên cao để quan sát tổng thể.",
      "Khi kết hợp với AI, dữ liệu hình ảnh có thể được phân tích nhằm xác định những khu vực cần kiểm tra kỹ hơn. Kết quả phân tích đóng vai trò tham khảo để người trồng đưa ra quyết định chăm sóc phù hợp.",
      "Trong tương lai, việc tích hợp dữ liệu drone với hồ sơ từng cây có thể giúp quá trình quản lý vườn trở nên trực quan và có hệ thống hơn.",
    ],
  },
  {
    id: "iot-farm-07",
    publisher: "VWING Smart Farming",
    date: "22/03/2026",
    title:
      "Nông nghiệp thông minh: Khi cảm biến đất trở thành trợ lý của nhà vườn",
    summary:
      "Cảm biến độ ẩm đất và dữ liệu thời tiết giúp người trồng theo dõi điều kiện canh tác, lập kế hoạch tưới và hạn chế việc sử dụng tài nguyên không cần thiết.",
    category: "IoT & cảm biến",
    readTime: "4 phút",
    imageUrl:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900",
    content: [
      "Độ ẩm đất là một trong những thông tin quan trọng trong quá trình chăm sóc cây trồng. Nếu chỉ dựa vào quan sát bề mặt, người trồng có thể khó đánh giá đầy đủ tình trạng nước tại vùng rễ.",
      "Hệ thống cảm biến có thể ghi nhận dữ liệu theo thời gian và chuyển thông tin đến nền tảng quản lý. Khi kết hợp với điều kiện thời tiết và đặc điểm cây trồng, dữ liệu này hỗ trợ xây dựng lịch tưới phù hợp hơn.",
      "Tuy nhiên, cảm biến cần được lắp đặt đúng vị trí, hiệu chuẩn định kỳ và kết hợp với kiểm tra thực tế để bảo đảm dữ liệu có ý nghĩa.",
    ],
  },
  {
    id: "sustainable-farm-08",
    publisher: "VWING Green Agriculture",
    date: "05/04/2026",
    title: "Canh tác bền vững: Tối ưu nước và vật tư từ dữ liệu thực tế",
    summary:
      "Tìm hiểu cách ghi chép lịch sử chăm sóc, theo dõi tài nguyên và phân tích dữ liệu giúp nhà vườn cải thiện hiệu quả sản xuất theo hướng bền vững.",
    category: "Nông nghiệp bền vững",
    readTime: "6 phút",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900",
    content: [
      "Canh tác bền vững không chỉ nằm ở việc giảm sử dụng vật tư mà còn đòi hỏi người trồng hiểu rõ điều kiện vườn và nhu cầu của cây trong từng giai đoạn.",
      "Việc ghi chép lịch tưới, bón phân, xử lý sâu bệnh và kết quả sau chăm sóc tạo nên nguồn dữ liệu hữu ích để so sánh giữa các mùa vụ.",
      "Khi dữ liệu được tổng hợp trên một nền tảng thống nhất, nhà vườn có thêm cơ sở để đánh giá chi phí, nhận diện những hoạt động chưa hiệu quả và cải thiện kế hoạch sản xuất.",
    ],
  },
  {
    id: "digital-orchard-09",
    publisher: "VWING Digital Agriculture",
    date: "12/04/2026",
    title:
      "Số hóa từng cây trồng: Xây dựng hồ sơ chăm sóc cho vườn cây lâu năm",
    summary:
      "Hồ sơ số giúp lưu trữ vị trí cây, lịch sử chăm sóc và tình trạng sinh trưởng, tạo nền tảng cho việc quản lý vườn cây có hệ thống.",
    category: "Chuyển đổi số",
    readTime: "5 phút",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",
    content: [
      "Ở những vườn cây lâu năm, thông tin chăm sóc thường được lưu giữ qua sổ ghi chép hoặc kinh nghiệm của người quản lý. Khi quy mô vườn tăng lên, việc tìm lại lịch sử của từng cây có thể trở nên khó khăn.",
      "Hồ sơ số có thể lưu mã định danh, vị trí, giống cây, lịch sử bón phân, tưới nước và các lần phát hiện sâu bệnh. Người quản lý nhờ đó dễ dàng tra cứu thông tin và theo dõi quá trình phát triển.",
      "Khi kết hợp bản đồ và công cụ phân tích dữ liệu, hồ sơ số tạo nền tảng để phát triển các tính năng cảnh báo, thống kê và hỗ trợ ra quyết định cho nhà vườn.",
    ],
  },
];

export const activeMission: TelemetryMission = {
  id: "mission-48",
  code: "Đắk Lắk Mission #48",
  location: "Vườn Sầu Riêng Krông Pắc, Đắk Lắk",
  crop: "Sầu Riêng Monthong & Ri6 (120 ha)",
  canopyHealthPercent: 98.4,
  altitudeMeters: 18.5,
  speedMs: 8.2,
  windSpeedMs: 3.2,
  batteryPercent: 84,
  ndviAverage: 0.86,
  biomassPercent: 94.2,
  canopyAreaM2: 18.4,
  laserPulseFreq: "1.4M pts/s",
  rtkStatus: "RTK GPS Lock (±0.8cm)",
  spectralBands: 5,
};
