// components/EMHUN/AnalysisChart/AnalysisChart.js
import React, { useRef } from 'react';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cho Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const AnalysisChart = ({ data }) => {
    // Chuẩn bị dữ liệu cho biểu đồ
    const chartData = {
        labels: data ? data.map((item, index) => `Itemset ${index + 1}`) : [],
        datasets: [
            {
                label: 'Utility',
                data: data ? data.map((item) => item.utility) : [],
                backgroundColor: 'rgba(136, 132, 216, 0.2)',
                borderColor: '#8884d8',
                borderWidth: 2,
                pointBackgroundColor: '#8884d8',
                pointBorderColor: '#8884d8',
                fill: true,
            },
        ],
    };

    // Tùy chọn biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Itemset',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Utility',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default AnalysisChart;
