#!/usr/bin/env node

var child_process = require('child_process');
var download_string = '';

var fs = require('fs');
var lesson_dir = 'storage/Lessons/';
var download_link_file = 'storage/download_link.txt';

var util = require('util');

var lessen_infos;
var lessens_links_file = "storage/lessen_infos.json";

// Note: this cookie come from browser header 
var cookie_header = '--header=Cookie: _gauges_unique_month=1; _gauges_unique_year=1; _gauges_unique=1; _gauges_unique_day=1; _gauges_unique_hour=1; _nsscreencast_session=BAh7CEkiEF9jc3JmX3Rva2VuBjoGRUZJIjFydTh2R2JBalZXK2g2d3RldFJkRXErNjJQREEvbW04RmJCOGNJYno0d29VPQY7AEZJIgx1c2VyX2lkBjsARmkCvAlJIg9zZXNzaW9uX2lkBjsAVEkiJWNhNGVhZTA0ZDVkZjIxODFmYjY0MTlhMDI3YTI3ODNjBjsAVA%3D%3D--fce9366d8e0edee7871a7cd6e91971ec1dc45f39';
var user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:26.0) Gecko/20100101 Firefox/26.0';

function download()
{
    var download_option = [
        cookie_header,
        '--user-agent='+user_agent,
        '--check-certificate=false',
        '--continue=true',
        '--max-concurrent-downloads=5',
        '--input-file='+download_link_file
    ]
    child = child_process.spawn('aria2c', download_option);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data) 
    {
      console.log(data);
    });
}

lessen_infos = JSON.parse(fs.readFileSync(lessens_links_file, 'utf8'));

for(var key in lessen_infos)
{
    var lesson = lessen_infos[key];
    var lesson_file_name = lesson.Title + '.mp4';
    download_string += lesson.DownloadLink + "\r\n";
    download_string += "\t" + 'out=' + lesson_dir + lesson_file_name + "\r\n";
}

fs.writeFileSync(download_link_file, download_string);

download();
