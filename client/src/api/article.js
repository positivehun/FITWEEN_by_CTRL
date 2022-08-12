import API from './index';
// article 리스트
export const getArticleList = async () => {
	const res = await API.get('/article/list');
	return res.data;
};

// article 상세
export const getArticleDetail = async articleIdx => {
	const res = await API.get(`/article/detail/${articleIdx}`);
	return res.data;
};

// article등록
export const registArticle = async body => {
	const res = await API.post('/article/regist', body);
	return res.data;
};

// article수정
export const modifyArticle = async (articleIdx, body) => {
	const res = await API.put(`/article/${articleIdx}`, body);
	return res.data;
};

// article삭제
export const deleteArticle = async articleIdx => {
	const res = await API.delete(`/article/${articleIdx}`);
	return res.data;
};

// 찜한 피드
export const getArticleLikeList = async () => {
	const res = await API.get('/article/likelist');
	return res.data;
};

// article 좋아요/취소
export const modifyArticleLike = async articleIdx => {
	const res = await API.post(`/article/like/${articleIdx}`);
	return res.data;
};

// article 대여 가능/불가능 수정
export const modifyArticleAvailable = async articleIdx => {
	const res = await API.post(`/article/available/${articleIdx}`);
	return res.data;
};
