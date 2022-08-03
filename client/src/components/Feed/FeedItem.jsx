import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import FeedProfile from '../../components/Feed/FeedProfile';
import null_profile from '../../assets/null_profile_img.png';
import checkbox2 from '../../assets/checkbox2.svg';
import { ReactComponent as Heart } from '../../assets/heart_active.svg';

const FeedItem = ({ userId, articleImg, title, rentPrice, isLiked, likeCnt }) => {
	return (
		<div
			css={css`
				flex-direction: column;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0px 30px 20px;
			`}
		>
			{/* 상단부 - 작성자 정보, 대여가능 여부 */}
			<FeedProfile imgSrc={null_profile} userId={userId} isRent={checkbox2} />
			{/* 게시글 이미지 */}
			<img
				src={articleImg}
				alt=""
				css={css`
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
				`}
			/>
			{/* 하단부 - 제목, 가격, 좋아요 수, 시간 */}
			<div
				css={css`
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					box-sizing: border-box;
					border: 1.5px solid #f0f0f0;
					border-radius: 0px 0px 20px 20px;
				`}
			>
				{/* 하단부 왼쪽 - 제목, 대여 가격*/}
				<div
					css={css`
						display: flex;
						flex-direction: column;
						padding: 20px 0px 20px 20px;
						width: 70%;
					`}
				>
					{/* 제목 */}
					<h1
						className="fw-500 fs-16"
						css={css`
							overflow: hidden;
							text-overflow: ellipsis;
							word-break: break-word;
							height: 20px;
							line-height: 20px;
							display: -webkit-box;
							-webkit-line-clamp: 1; /* 라인수 */
							-webkit-box-orient: vertical;
						`}
					>
						{title}
					</h1>
					{/* 대여 가격 */}
					<div>
						<span className="fw-400 fs-14" style={{ lineHeight: '20.27px' }}>
							일 {rentPrice}원
						</span>
					</div>
				</div>
				{/* 하단부 오른쪽 - 좋아요, 작성시간*/}
				<div
					css={css`
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						padding: 20px;
						width: 30%;
						max-width: 90px;
					`}
				>
					{/* 찜 */}
					<div>
						<Heart fill={isLiked ? 'red' : 'white'} stroke={isLiked ? 'red' : 'black'} />
						<div className="fw-500 fs-16" style={{ lineHeight: '22.59px' }}>
							{likeCnt}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeedItem;