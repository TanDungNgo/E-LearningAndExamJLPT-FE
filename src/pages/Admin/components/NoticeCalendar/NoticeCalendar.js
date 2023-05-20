import { Calendar, theme } from 'antd';
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};
const NoticeCalendar = () => {
  const { token } = theme.useToken();
  const wrapperStyle = {
    maxWidth: 400,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={{
      ...wrapperStyle,
    }}>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
};
export default NoticeCalendar;