    document.getElementById('adminForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', { // Or /register
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Admin login successful!');
                localStorage.setItem('adminToken', data.token); // Store the token
                // Redirect to an admin dashboard or show admin features
            } else {
                alert(`Admin login failed: ${data.msg || 'Invalid credentials'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server for admin login.');
        }
    });
    