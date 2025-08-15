import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLocalizedRole, getLocalizedGender } from '../../utils/i18nUtils';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { verifyUser } from '../../store/slices/usersSlices';

const UsersDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [verifyLoading, setVerifyLoading] = React.useState(false);
  const [verifyError, setVerifyError] = React.useState<string | null>(null);
  const [verifySuccess, setVerifySuccess] = React.useState(false);

  // Optionally fetch user details if not already in state
  // useEffect(() => {
  //   if (id) dispatch(fetchUserById(id));
  // }, [id, dispatch]);

  // For now, get user from users list in state
  const user = useAppSelector(state => state.users.users.find(u => u.id === id));

  if (!user) return <div>جاري التحميل أو المستخدم غير موجود</div>;

  const handleVerify = async () => {
    if (!id) return;
    setVerifyLoading(true);
    setVerifyError(null);
    setVerifySuccess(false);
    try {
      await dispatch(verifyUser(id)).unwrap();
      setVerifySuccess(true);
    } catch (err: any) {
      setVerifyError(err || 'حدث خطأ أثناء التحقق من المستخدم');
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-primary-600">{t('common.back')}</button>
      <h1 className="text-2xl font-bold mb-4">{t('pages.userDetails')}</h1>
      <div className="space-y-2">
        <div><strong>{t('table.name')}:</strong> {user.userName}</div>
        <div><strong>{t('table.phone')}:</strong> {user.phone}</div>
        <div><strong>{t('table.role')}:</strong> {getLocalizedRole(user.role, t)}</div>
        <div><strong>{t('table.city')}:</strong> {user.city?.name}</div>
        <div><strong>{t('table.country')}:</strong> {user.country?.name}</div>
        <div><strong>{t('table.region')}:</strong> {user.region}</div>
        <div><strong>{t('table.dateOfBirth')}:</strong> {user.dateOfBirth}</div>
        <div><strong>{t('table.gender')}:</strong> {user.gender ? getLocalizedGender(user.gender, t) : '-'}</div>
        <button
          onClick={handleVerify}
          disabled={verifyLoading}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg mt-4"
        >
          {verifyLoading ? t('common.processing') : t('common.verify', 'تفعيل المستخدم')}
        </button>
        {verifyError && <div className="text-red-500 mt-2">{verifyError}</div>}
        {verifySuccess && <div className="text-green-600 mt-2">{t('messages.updateSuccess')}</div>}
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default UsersDetails;