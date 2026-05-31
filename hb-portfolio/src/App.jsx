import React, { useState, useEffect } from 'react';
import './App.css';

// Khai báo nội dung chi tiết cho 6 bài tập (Đặt ngoài function App)
const EXERCISES_CONTENT = {
  1: {
    mucTieu: "Rèn luyện kỹ năng tạo, đổi tên, sao chép, di chuyển, xóa tệp tin và thư mục một cách thành thạo trên hệ điều hành Windows (có thể điều chỉnh cho macOS/Linux).",
    quaTrinh: "Tôi đã thực hiện các thao tác cơ bản trên File Explorer gồm: tạo thư mục và tệp tin mới, đổi tên tệp, tạo thư mục con, sao chép và di chuyển tệp giữa các thư mục, xóa tệp vào Thùng rác, xóa vĩnh viễn bằng Shift + Delete và khôi phục tệp từ Recycle Bin.",
    pdfUrl: "https://drive.google.com/file/d/1QPcp7D2aJ9BWhfsZUqgIQMF3QhyRskCn/preview"
  },
  2: {
    mucTieu: "Phát triển kỹ năng tìm kiếm và đánh giá thông tin học thuật từ các nguồn đáng tin cậy.",
    quaTrinh: "Tôi đã lựa chọn một chủ đề thuộc ngành Răng Hàm Mặt là Bệnh lý tủy hoại tử, tìm kiếm tài liệu từ các cơ sở dữ liệu học thuật như Google Scholar, tạp chí khoa học, sách chuyên khảo và nguồn thông tin trên Internet. Sau khi thu thập ít nhất 10 tài liệu tham khảo, tôi đánh giá độ tin cậy của từng nguồn dựa trên tác giả, nhà xuất bản, phương pháp nghiên cứu, số lần trích dẫn và tính cập nhật. Cuối cùng, tôi lập bảng tổng hợp, xếp hạng độ tin cậy của các nguồn và trình bày danh mục tài liệu tham khảo theo định dạng Harvard.",
    pdfUrl: "https://drive.google.com/file/d/1Z0L5diLR_1LJ4_u768xYPA6xnWd4TQI8/preview"
  },
  3: {
    mucTieu: "Phát triển kỹ năng viết prompt hiệu quả để tận dụng tối đa khả năng của các mô hình ngôn ngữ lớn trong học tập.",
    quaTrinh: "Tôi đã lựa chọn ba tác vụ học tập gồm tóm tắt tài liệu, giải thích khái niệm và tạo câu hỏi ôn tập. Với mỗi tác vụ, tôi xây dựng ba loại prompt (cơ bản, cải tiến và nâng cao), sau đó thử nghiệm trên công cụ AI như ChatGPT và so sánh kết quả. Dựa trên các tiêu chí về độ chính xác, tính đầy đủ và mức độ đáp ứng yêu cầu, tôi phân tích hiệu quả của từng prompt, rút ra các nguyên tắc viết prompt hiệu quả và tổng hợp kết quả trong báo cáo. Các bước thực hiện đều có hình ảnh chụp màn hình minh chứng, được tổng hợp thành một bài báo cáo để nộp.",
    pdfUrl: "https://drive.google.com/file/d/1t13EwyzrolygMJfm51Sc4oHUSZFerygG/preview"
  },
  4: {
    mucTieu: "Thành thạo các công cụ hợp tác trực tuyến để quản lý dự án nhóm hiệu quả.",
    quaTrinh: "Yêu cầu của bài là làm việc với nhóm, tôi tiến hành thảo luận bài làm với nhóm đã được chia sẵn. Chúng tôi đã chọn dự án của nhóm là về chủ đề “Phẫu thuật trong miệng”.. Dùng công cụ giao tiếp nhóm là Messenger, Google meet. Sử dụng các công cụ hợp tác trực tuyến như là Trello, Google Docs, Google Drive,... Với mỗi thao tác với các công cụ hợp tác trực tuyến, đều có ảnh chụp màn hình minh chứng hoạt động. Thực hiện theo thứ tự các yêu cầu của bài tập.Trong quá trình làm việc nhóm, chúng tôi có biên bản hoạt động nhóm, để ghi lại thời gian họp nhóm, phân công nhiệm vụ, ý kiến của các thành viên nhóm, đánh giá ý thức tham gia của các thành viên. Các hình ảnh minh chứng, nội dung làm việc đều được tổng hợp lại thành một bản báo cáo để nộp. Hồ sơ làm việc nhóm cũng được hoàn thiện và nộp kèm theo bản báo cáo.",
    pdfUrl: "https://drive.google.com/file/d/1z1MNte3s0LBz8AtM4qHE5gG2Cb6o8gHy/preview"
  },
  5: {
    mucTieu: "Thành thạo việc sử dụng các công cụ AI tạo sinh để hỗ trợ quá trình sáng tạo nội dung số.",
    quaTrinh: "Tôi chọn dự án cá nhân là một bài thuyết trình về chủ đề Chụp phim cận chóp trong răng hàm mặt. Tôi sử dụng công cụ AI tạo văn bản là Google Gemini, công cụ AI tạo hình ảnh Dall-E 3, công cụ AI hỗ trợ thiết kế Canva AI. Sử dụng các prompt để thực hiện dự án. Từ đầu ra của Al, tôi đã sửa lại cho đúng với thực tế. Sau đó viết phân tích về vai trò của AI trong quá trình sáng tạo của tôi, như là phần làm tốt và hạn chế, đặc biệt là các vấn đề đạo đức cần cân nhắc. Tất cả các thao tác thực hiện với AI đều có hình ảnh chụp màn hình để minh chứng. Nội dung và hình ảnh được tổng hợp lại thành một bản báo cáo.Qua bài thực hành, tôi rèn luyện được kỹ năng sử dụng AI trong sáng tạo nội dung và hiểu rõ hơn về vai trò cũng như những hạn chế của AI trong thực tế. để nộp hoàn thiện.",
    pdfUrl: "https://drive.google.com/file/d/1PIZ8PdDXxH7Sjm_u02FH3oTRdl8NqOaP/preview"
  },
  6: {
    mucTieu: "Phát triển kỹ năng sử dụng AI có trách nhiệm và đạo đức trong học tập và nghiên cứu.",
    quaTrinh: "Tôi chọn nghiên cứu chính sách của trường tôi đang theo học là Trường Đại học Y-Dược, Đại học Quốc gia Hà Nội. Tôi chọn nhiệm vụ học tập của mình là chuẩn bị một bài thuyết trình và thực hiện với sự hỗ trợ của AI. Quá trình thực hiện với AI đều có hình ảnh chụp màn hình để minh chứng. Sau đó, phân tích các vấn đề đạo đức liên quan đến sử dụng AI trong học thuật. Từ đó xây dựng bộ 5 nguyên tắc cá nhân về cách sử dụng AI có trách nhiệm trong học thuật. Tạo một infographic về bộ 5 nguyên tắc đó.",
    pdfUrl: "https://drive.google.com/file/d/1XFmo9pFipDG_Z1g1Z6MWm-FAeH2x5k0A/preview"
  }
};

function App() {
  const [currentView, setCurrentView] = useState('home');

  // ================= LOGIC ĐIỀU HƯỚNG BẰNG TRÌNH DUYỆT (GO BACK/FORWARD) =================
  const navigateToView = (viewName) => {
    setCurrentView(viewName);
    window.history.pushState({ view: viewName }, '', `#${viewName}`);
  };

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      }
    };
    
    window.history.replaceState({ view: 'home' }, '', '#home');
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  // =========================================================================================

  return (
    <div className="portfolio-dark-theme">
      {/* 1. THANH ĐIỀU HƯỚNG (Navbar) */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigateToView('home')} title="Quay về Trang chủ">
          <img 
            src="logo.png" 
            alt="Logo" 
            className="nav-logo" 
          />
          <div className="nav-title">
            Nhập môn công nghệ số và ứng dụng trí tuệ nhân tạo
          </div>
        </div>

        <ul className="nav-links">
          <li className={currentView === 'home' ? 'active' : ''}>
            <a href="#home" onClick={(e) => { e.preventDefault(); navigateToView('home'); }}>
              Trang chủ
            </a>
          </li>

          {/* MENU GIỚI THIỆU */}
          <li className={`nav-dropdown ${['gioi-thieu', 'muc-tieu', 'muc-tieu-du-an'].includes(currentView) ? 'active' : ''}`}>
            <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-toggle">
              Giới thiệu <span className="arrow">▼</span>
            </a>
            
            <ul className="dropdown-menu">
              <li>
                <a href="#gioi-thieu" onClick={(e) => { e.preventDefault(); navigateToView('gioi-thieu'); }}>
                  Thông tin cá nhân
                </a>
              </li>
              <li>
                <a href="#muc-tieu" onClick={(e) => { e.preventDefault(); navigateToView('muc-tieu'); }}>
                  Mục tiêu học tập
                </a>
              </li>
              <li>
                <a href="#muc-tieu-du-an" onClick={(e) => { e.preventDefault(); navigateToView('muc-tieu-du-an'); }}>
                  Mục tiêu của dự án
                </a>
              </li>
            </ul>
          </li>

          {/* MENU DỰ ÁN */}
          <li className={`nav-dropdown ${['du-an-chi-tiet', 'bai-tap-1', 'bai-tap-2', 'bai-tap-3', 'bai-tap-4', 'bai-tap-5', 'bai-tap-6'].includes(currentView) ? 'active' : ''}`}>
            <a href="#du-an" onClick={(e) => { e.preventDefault(); navigateToView('du-an-chi-tiet'); }} className="dropdown-toggle">
              Dự án <span className="arrow">▼</span>
            </a>
            
            <ul className="dropdown-menu">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <li key={num}>
                  <a href={`#bai-tap-${num}`} onClick={(e) => { e.preventDefault(); navigateToView(`bai-tap-${num}`); }}>
                    Bài tập {num}
                  </a>
                </li>
              ))}
            </ul>
          </li>
              
          <li className={currentView === 'tong-ket' ? 'active' : ''}>
            <a href="#tong-ket" onClick={(e) => { e.preventDefault(); navigateToView('tong-ket'); }}>
              Tổng kết
            </a>
          </li>
          <li className="search-icon">🔍</li>
        </ul>
      </nav>

      {/* 2. ĐIỀU HƯỚNG HIỂN THỊ NỘI DUNG */}

      {/* --- TRƯỜNG HỢP 1: TRANG CHỦ (ĐÃ SỬA TỪ 'trang-chu' THÀNH 'home') --- */}
      {currentView === 'home' && (
        <div className="home-page-wrapper">
          <header className="hero-banner home-bg">
            <div className="goals-title-wrapper-under">
              <h1>DỰ ÁN CÁ NHÂN</h1>
              <div className="underline-gold"></div>
            </div>
            {/* Nút bấm nằm trong Banner theo đúng yêu cầu thiết kế */}
            <button 
              className="banner-intro-btn" 
              onClick={() => navigateToView('gioi-thieu')}
            >
              Giới thiệu bản thân →
            </button>
          </header>
        </div>
      )}

      {/* --- TRƯỜNG HỢP 2: GIỚI THIỆU CHI TIẾT --- */}
      {currentView === 'gioi-thieu' && (
        <div className="goals-page-wrapper">
          <header className="hero-banner info-bg">
            <div className="goals-title-wrapper">
              <div className="line"></div>
              <h1>THÔNG TIN CÁ NHÂN</h1>
              <div className="line"></div>
            </div>
          </header>

          <div className="introduction-container" style={{ marginTop: '30px' }}>
            <div className="intro-section-top">
              <div className="intro-text-block">
                <h2>GIỚI THIỆU BẢN THÂN:</h2>
                <p>Mình tên là Đặng Trung Hiếu, sinh viên năm thứ 4 chuyên ngành Răng Hàm Mặt tại trường Đại học Y-Dược, Đại học Quốc gia Hà Nội.</p>
              </div>
              <div className="intro-photo-placeholder">
                <img 
                  src="IMG_0572.JPG"
                  alt="Ảnh cá nhân" 
                  style={{ maxWidth: '100%', height: 'auto' }} 
                />
              </div>
            </div>
            
            <hr className="intro-divider" />
            
            <div className="intro-section-bottom">
              <li>Chuyên ngành mình đang theo học là Răng Hàm Mặt.</li>
              <li>Đây là một chuyên ngành thuộc khối khoa học sức khỏe, tập trung vào việc chăm sóc, chẩn đoán, điều trị và dự phòng các bệnh lý vùng răng miệng và hàm mặt.</li>
              <li>Ngành học kết hợp giữa kiến thức y khoa và các kỹ thuật chuyên sâu nhằm bảo vệ, phục hồi chức năng ăn nhai, thẩm mỹ và sức khỏe răng miệng cho cộng đồng.</li>
            </div>
            
            <hr className="intro-divider" />
            
            <section className="hobbies-section">
              <h2 className="hobbies-title">SỞ THÍCH</h2>
              <div className="hobbies-grid">
                <div className="hobby-item">
                  <div className="hobby-image-placeholder">
                    <img 
                      src="Screenshot 2026-05-29 091635.png" 
                      alt="Ảnh chơi game" 
                      style={{ maxWidth: '100%', height: 'auto' }} 
                    />
                  </div>
                  <h3>CHƠI GAME</h3>
                </div>
                <div className="hobby-item">
                  <div className="hobby-image-placeholder">
                    <img 
                      src="loi-ich-cua-choi-bong-da (1).avif" 
                      alt="Ảnh thể thao" 
                      style={{ maxWidth: '100%', height: 'auto' }} 
                    />
                  </div>
                  <h3>THỂ THAO</h3>
                </div>
              </div>
              <p className="hobbies-footer-text">Ngoài ra còn một số sở thích khác như: nghe nhạc, xem phim,...</p>
            </section>
            
            <hr className="intro-divider" />
            
            <div className="bottom-action-container">
              <button className="info-badge" onClick={() => navigateToView('muc-tieu')}>Mục tiêu học tập</button>
            </div>
          </div>
        </div>
      )}

      {/* --- TRƯỜNG HỢP 3: MỤC TIÊU HỌC TẬP & ĐỊNH HƯỚNG --- */}
      {currentView === 'muc-tieu' && (
        <div className="goals-page-wrapper">
          <header className="hero-banner goals-bg">
            <div className="goals-title-wrapper">
              <div className="line"></div>
              <h1>MỤC TIÊU VÀ ĐỊNH HƯỚNG</h1>
              <div className="line"></div>
            </div>
          </header>
          
          <div className="goals-detail-container">
            <div className="goals-text-block">
              <h2>Mục tiêu học tập:</h2>
              <ul className="goals-list">
                <li>Trang bị nền tảng kiến thức y học và nha khoa vững chắc.</li>
                <li>Rèn luyện các kỹ năng lâm sàng cần thiết để có thể chẩn đoán, điều trị và dự phòng các bệnh lý răng miệng một cách hiệu quả.</li>
                <li>Cập nhật những tiến bộ khoa học kỹ thuật mới trong lĩnh vực nha khoa.</li>
              </ul>
            </div>
          </div>

          <hr className="intro-divider-full" />

          <div className="goals-detail-container">
            <div className="goals-text-block">
              <h2>Định hướng sắp tới của bản thân:</h2>
              <ul className="goals-list">
                <li>Tham gia thực hành lâm sàng để nâng cao năng lực chẩn đoán và điều trị các bệnh lý răng miệng.</li>
                <li>Ứng dụng các công nghệ mới như nha khoa kỹ thuật số, trí tuệ nhân tạo và các phương pháp điều trị tiên tiến.</li>
              </ul>
            </div>
          </div>

          <hr className="intro-divider-full" />

          <div className="bottom-action-container page-end-spacing">
            <button className="info-badge" onClick={() => navigateToView('muc-tieu-du-an')}>
              Mục tiêu của dự án
            </button>
          </div>
        </div>
      )}

      {/* --- TRƯỜNG HỢP 4: MỤC TIÊU CỦA DỰ ÁN --- */}
      {currentView === 'muc-tieu-du-an' && (
        <div className="goals-page-wrapper">
          <header className="hero-banner project-goals-bg">
            <div className="goals-title-wrapper">
              <div className="line"></div>
              <h1>MỤC TIÊU CỦA DỰ ÁN</h1>
              <div className="line"></div>
            </div>
          </header>

          <div className="portfolio-goal-container">
            <h2 className="portfolio-goal-title">MỤC TIÊU CỦA PORTFOLIO</h2>
            <div className="portfolio-goal-layout">
              <div className="portfolio-goal-text">
                <p>Hệ thống hóa và trình bày các kết quả bài tập thành phần đã thực hiện trong học phần vào một Portfolio Kỹ thuật số hoàn chỉnh, qua đó thể hiện kiến thức, kỹ năng và sản phẩm đạt được ở từng nội dung học tập.</p>
              </div>
            </div>
          </div>

          <hr className="intro-divider-full" />

          <div className="bottom-action-container page-end-spacing">
            <button className="info-badge" onClick={() => navigateToView('du-an-chi-tiet')}>
              Dự án
            </button>
          </div>
        </div>
      )}

      {/* --- TRƯỜNG HỢP 5: TRANG DANH SÁCH DỰ ÁN --- */}
      {currentView === 'du-an-chi-tiet' && (
        <div className="goals-page-wrapper">
          <header className="hero-banner project-bg">
            <div className="goals-title-wrapper-under">
              <h1>DỰ ÁN</h1>
              <div className="underline-gold"></div>
            </div>
          </header>

          <div className="project-content-container">
            <p className="project-intro-text">
              Trong học phần Nhập môn Công nghệ số và Trí tuệ nhân tạo, em đã thực hiện 6 bài tập quá trình, bao gồm: thao tác cơ bản với tệp tin và thư mục, tìm kiếm và đánh giá thông tin học thuật, viết Prompt hiệu quả cho AI, sử dụng công cụ hợp tác trực tuyến, ứng dụng AI tạo sinh để hỗ trợ sáng tạo nội dung và sử dụng AI có trách nhiệm trong học tập, nghiên cứu. Mỗi bài tập đều giúp em phát triển những kỹ năng số cần thiết, từ quản lý thông tin, khai thác tri thức đến ứng dụng công nghệ trong thực tiễn học tập.

              Trong số đó, bài tập mà em tâm đắc nhất là "An toàn và liêm chính học thuật trong môi trường số". Thông qua bài tập này, em nhận thức rõ hơn về tầm quan trọng của đạo đức học thuật trong thời đại công nghệ và trí tuệ nhân tạo phát triển mạnh mẽ. Em hiểu rằng việc sử dụng AI cần đi đôi với tính trung thực, minh bạch và trách nhiệm; người học phải biết kiểm chứng thông tin, trích dẫn nguồn tài liệu đầy đủ và tránh các hành vi sao chép hoặc gian lận học thuật. Bài tập không chỉ giúp em nâng cao nhận thức về an toàn thông tin và bảo vệ dữ liệu cá nhân mà còn hình thành thói quen sử dụng công nghệ một cách có đạo đức và chuyên nghiệp. Đây là bài học có giá trị lâu dài đối với em trong quá trình học tập, nghiên cứu và hành nghề y khoa trong tương lai.
            </p>

            <div className="project-grid-container">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button 
                  key={num} 
                  className="project-exercise-btn" 
                  onClick={() => navigateToView(`bai-tap-${num}`)}
                >
                  Bài tập {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TRƯỜNG HỢP: CHI TIẾT BÀI TẬP 1 ĐẾN 6 --- */}
      {[1, 2, 3, 4, 5, 6].map((num) => {
        const data = EXERCISES_CONTENT[num];
        
        return (
          currentView === `bai-tap-${num}` && (
            <div className="goals-page-wrapper" key={num}>
              <header className="hero-banner exercise-bg">
                <div className="goals-title-wrapper-under">
                  <h1>BÀI TẬP {num}</h1>
                  <div className="underline-gold"></div>
                </div>
              </header>

              <div className="exercise-detail-container">
                {/* PHẦN 1: MỤC TIÊU */}
                <section className="exercise-section">
                  <h2 className="exercise-section-title">MỤC TIÊU:</h2>
                  <p className="exercise-section-text">
                    {data.mucTieu}
                  </p>
                </section>
                
                <hr className="exercise-divider" />
                
                {/* PHẦN 2: QUÁ TRÌNH LÀM VIỆC */}
                <section className="exercise-section">
                  <h2 className="exercise-section-title">QUÁ TRÌNH LÀM VIỆC:</h2>
                  <p className="exercise-section-text">
                    {data.quaTrinh}
                  </p>
                </section>
                
                <hr className="exercise-divider" />
                
                {/* PHẦN 3: SẢN PHẨM */}
                <section className="exercise-section">
                  <h2 className="exercise-section-title">SẢN PHẨM:</h2>
                  <div className="pdf-embed-container">
                    <iframe 
                      src={data.pdfUrl} 
                      width="100%" 
                      height="600px" 
                      title={`Báo cáo Bài tập ${num}`}
                    ></iframe>
                  </div>
                </section>

                <div className="bottom-action-container" style={{ marginTop: '50px' }}>
                  <button 
                    className="info-badge" 
                    onClick={() => navigateToView(num === 6 ? 'tong-ket' : `bai-tap-${num + 1}`)}
                  >
                    {num === 6 ? 'Tổng kết' : `Bài tập ${num + 1}`}
                  </button>
                </div>
              </div>
            </div>
          )
        );
      })}

      {/* --- TRƯỜNG HỢP 6: TRANG TỔNG KẾT --- */}
{currentView === 'tong-ket' && (
  <div className="goals-page-wrapper">
    {/* Banner ảnh trên cùng */}
    <header className="hero-banner summary-bg">
      <div className="goals-title-wrapper-under">
        <h1>TỔNG KẾT</h1>
        <div className="underline-gold"></div>
      </div>
    </header>
          
    <div className="thanks-block">
      <h2 className="thanks-title">LỜI CẢM ƠN</h2>
      
      <div className="thanks-text-content">
        <p>Lời đầu tiên, em xin gửi lời tri ân sâu sắc nhất đến Quý Thầy/Cô giảng viên phụ trách học phần Nhập môn Công nghệ số. Đối với cá nhân em, học phần này không chỉ dừng lại việc cung cấp những kiến thức kỹ thuật hay kỹ năng sử dụng các công cụ số hoá, mà còn mang ý nghĩa như một "bước ngoặt" trong tư duy học tập đại học. Em xin chân thành cảm ơn Thầy/Cô đã tận tình hướng dẫn và định hướng, giúp em nhận thức rõ ràng rằng trong kỷ nguyên 4.0, công nghệ không chỉ là phương tiện làm việc nhanh hơn, mà còn là thách thức đòi hỏi người sử dụng phải có bản lĩnh, trí tuệ, và đặc biệt là đạo đức nghề nghiệp.</p>
        
        <p>Thông qua quá trình xây dựng Portfolio và thực hiện các dự án có sử dụng AI có trách nhiệm, em đã học được những bài học quý giá về sự cẩn trọng, tính liêm chính và tư duy phản biện - những phẩm chất cốt lõi của một sinh viên Y. Sự chỉ dẫn tận tâm của Thầy/Cô chính là nguồn động lực lớn để em vượt qua những bỡ ngỡ ban đầu và tự tin làm chủ các công cụ số phục vụ cho việc nghiên cứu sau này.</p>
        
        <p>Những kiến thức nền tảng mà Thầy/Cô truyền đạt sẽ là hành trang vững chắc theo em suốt chặng đường học tập và hành nghề y đức trong tương lai. Em xin kính chúc Thầy/Cô dồi dào sức khoẻ, hạnh phúc và luôn giữ vững ngọn lửa nhiệt huyết trong sự nghiệp giáo dục.</p>
        
        <p className="final-thanks">Em xin chân thành cảm ơn!</p>
      </div>
    </div>

    {/* 1. PHẦN BÀI HỌC & KHÓ KHĂN ĐƯỢC ĐƯA LÊN TRƯỚC (Căn trái theo yêu cầu cũ) */}
    <div className="exercise-detail-container" style={{ marginTop: '50px' }}>
      <div className="exercise-section">
        
        {/* Mục con: Bài học rút ra */}
        <div style={{ marginBottom: '25px', textAlign: 'left' }}>
          <h3 style={{ color: '#ffffff', fontSize: '17px', marginBottom: '8px' }}>Những kiến thức và kỹ năng đã học được</h3>
          <p className="exercise-section-text">
            Thông qua học phần Nhập môn Công nghệ số và Trí tuệ nhân tạo, em đã tiếp thu được nhiều kiến thức và kỹ năng quan trọng phục vụ cho học tập trong thời đại số. Em đã hiểu được vai trò của công nghệ số và trí tuệ nhân tạo trong giáo dục, nghiên cứu và đời sống. Bên cạnh đó, em được rèn luyện kỹ năng tìm kiếm và đánh giá thông tin học thuật, sử dụng các công cụ số để cộng tác trực tuyến, xây dựng Prompt hiệu quả khi làm việc với AI và ứng dụng AI vào quá trình học tập một cách có trách nhiệm. Ngoài ra, việc thiết kế Portfolio kỹ thuật số còn giúp em nâng cao kỹ năng tổ chức, trình bày và quản lý thông tin trên môi trường số.
          </p>
        </div>

        {/* Mục con: Khó khăn gặp phải */}
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ color: '#ffffff', fontSize: '17px', marginBottom: '8px' }}>Những điều tâm đắc và thách thức khi xây dựng Portfolio</h3>
          <p className="exercise-section-text" style={{ fontStyle: 'italic' }}>
            Điều em tâm đắc nhất trong quá trình thực hiện Portfolio là có cơ hội tổng hợp toàn bộ kiến thức và sản phẩm đã thực hiện trong học phần thành một hồ sơ số hoàn chỉnh. Qua đó, em nhận thấy rõ sự tiến bộ của bản thân trong việc sử dụng công nghệ số và các công cụ AI. Tuy nhiên, em cũng gặp một số khó khăn như lựa chọn bố cục phù hợp, trình bày nội dung một cách khoa học và đảm bảo tính thống nhất giữa các phần của Portfolio. Việc làm quen với các công cụ thiết kế và chỉnh sửa trực tuyến ban đầu cũng là một thách thức. Dù vậy, những khó khăn này đã giúp em rèn luyện khả năng tự học, tư duy sáng tạo và kỹ năng giải quyết vấn đề, góp phần hoàn thiện sản phẩm cuối cùng một cách hiệu quả.
          </p>
        </div>
      </div>
    </div>

    {/* Đường kẻ mảnh phân tách giữa 2 phần */}
    <hr className="exercise-divider" style={{ margin: '50px auto' }} />
  </div>
)}
                                                                   
      {/* 3. KHỐI FOOTER CHÂN TRANG CỐ ĐỊNH */}
      <footer className="footer-student-info">
        <div className="footer-row">
          <div className="info-item">Người thực hiện: <strong>Đặng Trung Hiếu</strong></div>
          <div className="info-item">Mã sinh viên: <strong>22100351</strong></div>
          <div className="info-item">Mã học phần: <strong>VNU1001_E252025</strong></div>
        </div>
        
        <div className="footer-row">
          <div className="info-item">Email: <strong>dangtrunghieu_y67@hus.edu.vn</strong></div>
          <div className="info-item">
            <a href="https://www.facebook.com/Ueih16" className="footer-fb-link">
              FB : Đặng Trung Hiếu
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;