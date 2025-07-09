document.addEventListener('DOMContentLoaded', () => {

    const profileView = document.getElementById('profile-view');
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    const profileImg = document.getElementById('profile-img');
    const profileName = document.getElementById('profile-name');
    const profileAge = document.getElementById('profile-age');
    const profileAddress = document.getElementById('profile-address');
    const profileBio = document.getElementById('profile-bio');
    const editButton = document.getElementById('edit-button');
    const editAvatarIcon = document.getElementById('edit-avatar-icon');

    const editFormSection = document.getElementById('edit-form-section');
    const editForm = document.getElementById('edit-form');
    const cancelButton = document.getElementById('cancel-button');
    const imageUploadInput = document.getElementById('imageUpload');

    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const ruaInput = document.getElementById('rua');
    const bairroInput = document.getElementById('bairro');
    const estadoInput = document.getElementById('estado');
    const bioInput = document.getElementById('bio');

    const API_URL = 'http://localhost:3001/api/usuario';
    let currentUserData = null;

    async function fetchAndDisplayUser() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Não foi possível buscar os dados do usuário.');
            
            const user = await response.json();
            currentUserData = user;

            profileImg.src = user.imagem_perfil_url || 'https://i.pravatar.cc/150?u=' + Date.now();
            profileName.textContent = user.nome_completo;
            profileAge.textContent = user.idade;
            profileAddress.textContent = user.rua && user.bairro && user.estado ? `${user.rua}, ${user.bairro}, ${user.estado}` : '';
            profileBio.textContent = user.biografia;

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }
   
    editButton.addEventListener('click', () => {
        if (!currentUserData) return;

        nameInput.value = currentUserData.nome_completo;
        ageInput.value = currentUserData.idade;
        ruaInput.value = currentUserData.rua;
        bairroInput.value = currentUserData.bairro;
        estadoInput.value = currentUserData.estado;
        bioInput.value = currentUserData.biografia;

        profileView.classList.add('hidden');
        editFormSection.classList.remove('hidden');
        editAvatarIcon.classList.remove('hidden');
        avatarWrapper.classList.add('editable'); 
    });
    
    avatarWrapper.addEventListener('click', () => {
    
        if (avatarWrapper.classList.contains('editable')) {
            imageUploadInput.click();
        }
    });
   
    cancelButton.addEventListener('click', () => {
        editFormSection.classList.add('hidden');
        profileView.classList.remove('hidden');
        editAvatarIcon.classList.add('hidden');
        avatarWrapper.classList.remove('editable'); 
    });

    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nome_completo', nameInput.value);
        formData.append('idade', ageInput.value);
        formData.append('rua', ruaInput.value);
        formData.append('bairro', bairroInput.value);
        formData.append('estado', estadoInput.value);
        formData.append('biografia', bioInput.value);
        
        if (imageUploadInput.files.length > 0) {
            formData.append('imagem_perfil', imageUploadInput.files[0]);
        } else if (currentUserData.imagem_perfil_url) {
            formData.append('imagem_perfil_url', currentUserData.imagem_perfil_url);
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Falha ao salvar as alterações.');
            
            await fetchAndDisplayUser();
            
            editFormSection.classList.add('hidden');
            profileView.classList.remove('hidden');
            editAvatarIcon.classList.add('hidden');
            avatarWrapper.classList.remove('editable'); 

        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    });

    fetchAndDisplayUser();
});