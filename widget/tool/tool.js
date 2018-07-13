module.exports = { 
  _date_cur_date: new Date(),
  _date_reg_all: /^[12][0-9]{3}(-|\/)(0?[0-9]|1[0-2])(-|\/)(0?[1-9]|[1-2][0-9]|3[0-1]).(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-9]|[1-5][0-9])$/,
  _date_reg_year_month: /^[12][0-9]{3}(-|\/)(0?[0-9]|1[0-2])$/,
  _date_reg_year_month_date: /^[12][0-9]{3}(-|\/)(0?[0-9]|1[0-2])(-|\/)(0?[1-9]|[1-2][0-9]|3[0-1])$/,
  _date_reg_year_month_date_hour: /^[12][0-9]{3}(-|\/)(0?[0-9]|1[0-2])(-|\/)(0?[1-9]|[1-2][0-9]|3[0-1]).(0?[0-9]|1[0-9]|2[0-3])$/,
  _date_reg_year_month_date_hour_minute: /^[12][0-9]{3}(-|\/)(0?[0-9]|1[0-2])(-|\/)(0?[1-9]|[1-2][0-9]|3[0-1]).(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/,
  _date_reg_time: /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9]):(0?[0-9]|[1-5][0-9])$/,  
  tojsdate: function(date) {
    if (typeof date === 'string') {
      if (/^\d{11,}$/.test(date)) {
        return  new Date(+date);
      }
      date = date.replace(/-/g, '\/');
      if (this._date_reg_year_month.test(date)) {
        date += '/01';
      }
    }
    return new Date(date);
  },  
  getdate: function(date, format) {
    var now = this.tojsdate(date), 
      year = now.getFullYear(), 
      month = (now.getMonth() + 1), 
      day = now.getDate(), 
      hour = now.getHours(), 
      minute = now.getMinutes(),
      second = now.getSeconds(),
      result, fill = function(val) {
        return (val < 10 ? '0' : '') + val;
      };
    month = fill(month);  
    day = fill(day);
    hour = fill(hour);
    minute = fill(minute);
    second = fill(second);
    
    switch(format) {
      case 'YY-MM':
        result = year + '-' + month;
        break;
      case 'MM-DD':
        result = month + '-' + day;
        break;  
      case 'YY-MM-DD': 
        result = year + '-' + month + '-' + day;
        break;
      case 'YY-MM-DD-ZH': 
        result = year + '年' + month + '月' + day+'日';
        break;
      case 'YY-MM-DD HH:MM:SS':
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        break;  
      case 'YY-MM-DD HH:MM':
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        break;
      case 'YY/MM/DD HH:MM':
        result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
        break;
      case 'HH:MM':
        result = hour + ':' + minute;
        break;
      case 'HH:MM:SS':
        result = hour + ':' + minute + ':' + second;
        break;
      default:
        result = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second; 
    }
    return result;
  },
  getSearch:function(){
      var
      hashs ={},
      searchs = window.location.search,
      arrs = searchs.slice(1,searchs.length).split('&');
      arrs.forEach(function(item){
          var datas = item.split('=');
          hashs[datas[0]] = datas[1];
      });    
      return hashs;
  }
}