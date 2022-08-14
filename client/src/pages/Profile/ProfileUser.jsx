import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from 'styled-components';

import API from '../../api';
import TopNavigation from '../../components/Common/TopNavigation/TopNavigation';
import BottomNavigation from '../../components/Common/BottomNavigation/BottomNavigation';
import { useNavigate, useParams } from 'react-router-dom';
import null_profile from '../../assets/null_profile_img.png';
import gallery_img from '../../assets/gallery_img.png';
import ProfileTop from '../../components/Profile/ProfileTop';
import ProfileButton from '../../components/Profile/ProfileButton';
import { useUserDispatch, useUserState } from '../../context/User/UserContext';
import { getUserInfo } from '../../api/user';
import profile_menu from '../../assets/profile_menu.svg';
import Modal from '../../components/Common/Modal/Modal';
import colors from '../../constants/colors';
import { setLogout } from '../../context/User/UserTypes';

const Hr = styled.hr`
	border: none;
	border-bottom: 1px solid ${colors.grey50};
`;

const ProfileUser = ({ articleId }) => {
	const { userId } = useParams();
	const { loginedUserId } = useUserState();
	const navigate = useNavigate();
	const userDispatch = useUserDispatch();
	const [profileInfo, setProfileInfo] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	const logoutClickHandler = () => {
		userDispatch(setLogout());
		API.defaults.headers.common.Authorization = '';
	};

	useEffect(() => {
		const fetch = async () => {
			const data = await getUserInfo(userId);
			if (data.result === 'fail') {
				navigate('/main');
			}
			setProfileInfo(data);
		};
		fetch();
	}, [userId]);

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<>
			{profileInfo && (
				<TopNavigation
					backClick
					onBackClick={() => navigate(-1)}
					leftContent={<div>{profileInfo.nickname}</div>}
					rightMenu={
						loginedUserId === profileInfo.userId && (
							<img
								onClick={() => {
									openModal();
								}}
								src={profile_menu}
								alt=""
							/>
						)
					}
				/>
			)}

			<div
				className="wrapper"
				style={{
					width: '100%',
					height: '100%',
					overflowY: 'scroll',
				}}
			>
				{modalVisible && (
					<Modal visible={modalVisible} maskClosable onClose={closeModal}>
						<div
							css={css`
								text-align: center;
								font-family: 'Regular';
								font-size: 20px;
								line-height: 20px;
							`}
						>
							<div style={{ padding: '5px' }}>내 정보 수정</div>
							<Hr />
							<div style={{ padding: '5px' }}>내 동네 수정</div>
							<Hr />
							<div style={{ padding: '5px' }} onClick={() => logoutClickHandler}>
								로그아웃
							</div>
							<Hr />
							<div style={{ padding: '5px' }}>탈퇴하기</div>
							<Hr />
						</div>
					</Modal>
				)}
				{/* 프로필 상단 - 바이오, 버튼 */}
				<div>
					{/* 프로필 바이오 */}
					{profileInfo && (
						<ProfileTop
							key={profileInfo.userId}
							imgSrc={null_profile}
							followerCount={profileInfo.userFollowerCount}
							followingCount={profileInfo.userFollowingCount}
							clothesCount={profileInfo.articleCount}
						/>
					)}
					{/* 버튼 */}
					{profileInfo && loginedUserId !== profileInfo.userId && (
						<ProfileButton
							userId={profileInfo.userId}
							isFollowed={profileInfo.followed}
							setProfileInfo={setProfileInfo}
						/>
					)}
				</div>
				{/* 옷장 사진 */}
				<div
					css={css`
						display: flex;
						flex-direction: column;
					`}
				>
					{/* 사진 */}
					<div
						css={css`
							display: grid;
							grid-template-columns: 1fr 1fr;
							grid-template-rows: auto;
							place-items: center;
							gap: 10px;
							padding: 10px;
						`}
					>
						<img
							css={css`
								display: flex;
								width: 100%;
								height: 100%;
							`}
							src={gallery_img}
							alt=""
							onClick={() => navigate(`/article/${articleId}`)}
						/>
					</div>
				</div>
			</div>
			<BottomNavigation />
		</>
	);
};

export default ProfileUser;