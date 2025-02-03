import { getIpInfo } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const ipInput = document.getElementById('ipInput');
  const ipInfoTable = document.getElementById('ipInfoTable');

  searchButton.addEventListener('click', async () => {
    const ip = ipInput.value.trim();
    if (!ip) {
      alert('Por favor, insira um endereço IP.');
      return;
    }

    const ipInfo = await getIpInfo(ip);
    if (ipInfo) {
      const { ip, org, country, city } = ipInfo;
      ipInfoTable.innerHTML = `
        <tr>
          <td>${ip || 'N/A'}</td>
          <td>${org || 'N/A'}</td>
          <td>${country || 'N/A'}</td>
          <td>${city || 'N/A'}</td>
        </tr>
      `;
    } else {
        alert('Erro ao obter as informações do IP.');
    }
  });

  clearButton.addEventListener('click', () => {
    ipInput.value = '';
    ipInfoTable.innerHTML = '';
  });
});
