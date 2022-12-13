import React, { useState } from 'react'
import NewsItem from './NewsItem.js'
import './News.scss'
function NewsList() {
    const [articles, setArticles] = useState([
        {
            title: "NFT giúp bảo chứng quyền sở hữu tác phẩm nghệ thuật",
            description: "Người tạo NFT lẫn nhà sưu tầm cần nâng cao kiến thức, thay đổi thói quen sử dụng để tránh mất cắp, khi NFT dần trở nên có giá trị.",
            url: "https://vnexpress.net/nft-giup-bao-chung-quyen-so-huu-tac-pham-nghe-thuat-4545477.html",
            urlToImage: "https://i1-sohoa.vnecdn.net/2022/12/08/Image-ExtractWord-0-Out-9876-1670490859.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=3zMd3feTV6rCZcF8PNiBXQ"
        },
        {
            title: "App Store hỗ trợ NFT",
            description: "Apple bắt đầu cho phép các ứng dụng có mặt trên cửa hàng App Store có thể xem và giao dịch NFT bên trong.",
            url: "https://vnexpress.net/app-store-ho-tro-nft-4527545.html",
            urlToImage: "https://i1-sohoa.vnecdn.net/2022/10/25/-8839-1666663129.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=6Vzp0qfBQyWw1uj_SjoY-A"
        },
        {
            title: "Có gì thú vị từ bộ sưu tập kỹ thuật số đầu tiên của OpenLive NFT",
            description: "Mặc dù thị trường Crypto đang trong mùa downtrend, nhưng những ứng dụng và lợi ích mà Blockchain đang mang lại cho cuộc sống là không thể bàn cãi.",
            url: "https://tintucnft.com/co-gi-thu-vi-tu-bo-suu-tap-ky-thuat-so-dau-tien-cua-openlive-nft/",
            urlToImage: "https://tintucnft.com/wp-content/uploads/2022/11/316419076_508469987968808_4324007755559781658_n-1-1536x864.jpeg"
        },
        {
            title: "Cuộc chiến thu hút người dùng giữa các NFT marketplace",
            description: "Thị trường NFT suy giảm, người dùng là tài nguyên quý giá nhất",
            url: "https://coin68.com/cuoc-chien-thu-hut-nguoi-dung-giua-cac-nft-marketplace/",
            urlToImage: "https://coin68.com/wp-content/uploads/2022/11/BannerC68_NFTMarketplace.jpg"
        },
        {
            title: "Sau hiện tượng bùng nổ, vì sao thị trường NFT lao dốc?",
            description: "Sự quan tâm đến NFT giảm xuống thấp nhất từ trước đến nay, ở mức 14/100 điểm.",
            url: "https://genk.vn/sau-hien-tuong-bung-no-vi-sao-thi-truong-nft-lao-doc-20220903133529539.chn",
            urlToImage: "https://genk.mediacdn.vn/139269124445442048/2022/9/3/avatar1662178384935-1662178386052845646097-1662186838636-16621868399701017326601.jpeg"
        },
        {
            title: "Vụ gian lận đầu tiên trên thị trường tài sản số NFT tại Mỹ",
            description: "Các nhà chức trách Mỹ vừa cáo buộc một cựu giám đốc sản phẩm của nền tảng giao dịch kỹ thuật số OpenSea tội danh lừa đảo và rửa tiền. Các công tố viên nêu rõ đây là vụ gian lận đầu tiên liên quan sử dụng thông tin nội bộ trên thị trường tài sản kỹ thuật số NFT bị phát giác tại Mỹ.",
            url: "https://baotintuc.vn/the-gioi/vu-gian-lan-dau-tien-tren-thi-truong-tai-san-so-nft-tai-my-20220603151220279.htm",
            urlToImage: "https://cdnmedia.baotintuc.vn/Upload/YZmStSDTjb0M07hFJ2gA/files/2021/12/31/nft-311221.jpeg"
        },
        {
            title: "Bitcoin hướng đến tháng giao dịch tích cực nhất trong vòng 3 tháng, DOGE tăng bằng lần nhờ Elon Musk",
            description: "(ĐTCK) Tính đến thời điểm sáng ngày 31/10, thị trường tiền điện tử có 18/100 mã tăng điểm. Đồng tiền đứng đầu thị trường về giá trị vốn hóa - Bitcoin giảm 2,03%, còn 20.305 USD/BTC.",
            url: "https://www.tinnhanhchungkhoan.vn/bitcoin-huong-den-thang-giao-dich-tich-cuc-nhat-trong-vong-3-thang-doge-tang-bang-lan-nho-elon-musk-post308991.html",
            urlToImage: "https://photo-cms-tinnhanhchungkhoan.epicdn.me/w860/Uploaded/2022/sotnza/2021_10_01/shutterstock-2011245728-8114.jpg"
        },


    ])
    return (
        <div className='background-news'>
            <div className='text-news'>NFT News</div>
            {articles.map(article => {
                return (
                    <NewsItem key={article.title}
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage}
                    />
                )
            })}
        </div>
    )
}

export default NewsList