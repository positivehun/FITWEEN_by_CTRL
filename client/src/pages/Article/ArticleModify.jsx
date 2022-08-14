import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import colors from '../../constants/colors';
import TopNavigation from '../../components/Common/TopNavigation/TopNavigation';
import Button from '../../components/Common/Button/Button';
import Input from '../../components/Common/Input/Input';
import modify_img from '../../assets/modify_img.png';
import { modifyArticle, deleteArticle, getArticleDetail } from '../../api/article';
import TextArea from '../../components/Common/TextArea/TextArea';
import { Checkbox } from '../../components/Common/CheckBox/Checkbox';
import getByte from '../../utils/getByte';
import delete_icon from '../../assets/delete.svg';
import Modal from '../../components/Common/Modal/Modal';
import trash_modal_icon from '../../assets/trash_modal_Icon.svg';
import { MAX_BYTE } from '../../constants/config';

const ArticleModify = () => {
	const [title, setTitle] = useState();
	const [price, setPrice] = useState('');
	const [content, setContent] = useState('');
	const [isRent, setIsRent] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const fetch = async () => {
			const data = await getArticleDetail();
			setTitle(data.title);
			setPrice(data.price);
			setContent(data.content);
			setIsRent(data.lendstatus);
		};
		fetch();
	}, []);

	const openModal = () => {
		setModalVisible(true);
	};
	const closeModal = () => {
		setModalVisible(false);
	};
	const onContentChangeHandler = e => {
		e.preventDefault();
		if (getByte(e.target.value) <= MAX_BYTE) setContent(e.target.value);
	};
	const onModifyClickHandler = async () => {
		const body = {
			title: title,
			price: price,
			content: content,
			lendstatus: isRent,
		};

		try {
			const ret = await modifyArticle(body);
			navigate(`/article/${ret.article_idx}`);
		} catch (error) {
			alert('다시 시도하세요.');
		}
	};
	const onDeleteClickHandler = async () => {
		try {
			const ret = await deleteArticle();
			navigate('/article/list');
		} catch (error) {
			alert('다시 시도하세요.');
		}
	};

	return (
		<>
			<TopNavigation
				backClick
				onBackClick={() => navigate(-1)}
				leftContent={<span>FITWEEN</span>}
				rightMenu={
					<img
						src={delete_icon}
						alt=""
						onClick={() => {
							openModal();
						}}
					/>
				}
			/>
			<div
				className="wrapper"
				style={{
					width: '100%',
					height: '100%',
					overflow: 'scroll',
				}}
			>
				{modalVisible && (
					<Modal visible={modalVisible} maskClosable onClose={openModal} type="center">
						<div
							css={css`
								display: flex;
								flex-direction: column;
								align-items: center;
								gap: 25px;
							`}
						>
							<img src={trash_modal_icon} alt="" />
							<div style={{ fontFamily: 'Medium', fontSize: 18 }}>
								해당 게시글을 삭제하시겠습니까?
							</div>
							<div
								css={css`
									display: flex;
									flex-direction: row;
									align-items: flex-start;
									padding: 0px;
									gap: 16px;
								`}
							>
								<button
									onClick={closeModal}
									css={css`
										width: 100px;
										height: 45px;
										background: #f1f1f1;
										border-radius: 50px;
										font-family: 'Medium';
										font-size: 16px;
										border: none;
									`}
								>
									취소
								</button>
								<button
									onClick={onDeleteClickHandler}
									css={css`
										width: 100px;
										height: 45px;
										background: #6cc4a1;
										border-radius: 50px;
										border: none;
										color: white;
										font-family: 'Medium';
										font-size: 16px;
									`}
								>
									삭제
								</button>
							</div>
						</div>
					</Modal>
				)}
				{/* 사진 등록 */}
				<img
					src={modify_img}
					alt=""
					css={css`
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
					`}
				/>
				<div
					css={css`
						display: flex;
						flex-direction: column;
						padding: 30px 25px;
					`}
				>
					{/* 제목 */}
					<Input
						css={css`
							margin-bottom: 12px;
							border: 1px solid ${colors.black};
							text-align: center;
							box-shadow: none;
						`}
						type="text"
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder="제목"
					/>
					{/* 대여 가격 */}
					<Input
						css={css`
							margin-bottom: 12px;
							border: 1px solid ${colors.black};
							text-align: center;
							box-shadow: none;
						`}
						type="number"
						value={price}
						onChange={e => setPrice(e.target.value)}
						placeholder="1일 대여 가격"
					/>
					{/* 내용 */}
					<TextArea
						css={css`
							text-align: center;
							border: 1px solid ${colors.black};
							box-shadow: none;
						`}
						type="text"
						value={content}
						onChange={onContentChangeHandler}
						maxByte={MAX_BYTE}
						placeholder="내용"
					/>
					<div
						css={css`
							display: flex;
							align-items: center;
							justify-content: center;
						`}
					>
						<Checkbox
							checked={isRent}
							onChange={e => setIsRent(e.target.checked)}
							label={isRent ? '대여 가능' : '대여 불가'}
							id="checkrent"
						/>
					</div>
				</div>
				<div
					css={css`
						display: flex;
						padding: 0px 25px 25px 25px;
					`}
				>
					<Button
						onClick={onModifyClickHandler}
						type="active"
						label="수정하기"
						style={{ padding: 10 }}
					/>
				</div>
			</div>
		</>
	);
};

export default ArticleModify;