# 🚀 Deployment Guide for VEHICLE-LAB

Complete guide for deploying VEHICLE-LAB to various platforms.

---

## 🌐 Quick Deployment Options

### Option 1: Render (Recommended) ⭐
### Option 2: Railway
### Option 3: Heroku
### Option 4: DigitalOcean App Platform
### Option 5: AWS/GCP/Azure (Advanced)

---

## 📋 Pre-Deployment Checklist

- [ ] Repository is public (or deployment platform has access)
- [ ] All dependencies in `requirements.txt`
- [ ] `app.py` supports PORT environment variable ✅ (Done)
- [ ] `Procfile` or platform config file exists ✅ (Done)
- [ ] Test locally first ✅

---

## 1. 🎨 Render Deployment (Recommended)

### Why Render?
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration
- ✅ Auto-deploy on push

### Step-by-Step

#### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

#### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `25Bonged/VEHICLE-LAB`
3. Select branch: `main`
4. Root directory: `backend_mdf`

#### Step 3: Configure Service
```
Name: vehicle-lab
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: python3 app.py
```

#### Step 4: Environment Variables
Render automatically sets:
- `PORT` - Auto-assigned by Render ✅
- `PYTHON_VERSION` - Set in render.yaml ✅

Optional variables:
- `FLASK_DEBUG=0` - Disable debug mode
- `FLASK_ACCESS_LOG=0` - Reduce logging (optional)

#### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render builds and deploys automatically
3. Service URL: `https://vehicle-lab.onrender.com`

#### Step 6: Verify Deployment
- Check health endpoint: `https://your-app.onrender.com/`
- Test dashboard loads
- Upload test file

### Using render.yaml (Automatic)
The repository includes `render.yaml` for automatic configuration:
- Render auto-detects `render.yaml`
- Configures service automatically
- No manual setup needed!

---

## 2. 🚂 Railway Deployment

### Step-by-Step

#### Step 1: Create Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

#### Step 2: New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose `25Bonged/VEHICLE-LAB`
4. Root directory: `backend_mdf`

#### Step 3: Configure
Railway auto-detects:
- ✅ `Procfile` exists
- ✅ Python project
- ✅ `requirements.txt`

No additional config needed!

#### Step 4: Deploy
- Railway auto-deploys
- Service URL provided: `https://your-app.railway.app`

#### Step 5: Environment Variables (Optional)
In Railway dashboard:
- Add custom domain (optional)
- Set environment variables if needed

---

## 3. 🦅 Heroku Deployment

### Prerequisites
- Heroku CLI installed
- Heroku account

### Step-by-Step

#### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login
```bash
heroku login
```

#### Step 3: Create App
```bash
cd backend_mdf
heroku create vehicle-lab-app
```

#### Step 4: Set Python Version
```bash
# runtime.txt already exists with python-3.10.0 ✅
heroku buildpacks:set heroku/python
```

#### Step 5: Deploy
```bash
git push heroku main
```

#### Step 6: Open App
```bash
heroku open
```

### Heroku Config Vars
```bash
heroku config:set FLASK_DEBUG=0
heroku config:set FLASK_ACCESS_LOG=0
```

---

## 4. ☁️ DigitalOcean App Platform

### Step-by-Step

#### Step 1: Create App
1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Click **"Create"** → **"App"**
3. Connect GitHub repository

#### Step 2: Configure
```
Source Directory: backend_mdf
Build Command: pip install -r requirements.txt
Run Command: python3 app.py
```

#### Step 3: Deploy
- DigitalOcean auto-deploys
- HTTPS enabled automatically

---

## 5. 🔧 Custom Server Deployment

### Using Gunicorn (Recommended for Production)

#### Step 1: Install Gunicorn
```bash
pip install gunicorn
```

#### Step 2: Update requirements.txt
```
gunicorn>=20.1.0
```

#### Step 3: Update Procfile
```
web: gunicorn app:app --bind 0.0.0.0:$PORT --workers 4
```

#### Step 4: Run
```bash
gunicorn app:app --bind 0.0.0.0:8000
```

### Using Docker

#### Create Dockerfile
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python3", "app.py"]
```

#### Build and Run
```bash
docker build -t vehicle-lab .
docker run -p 8000:8000 vehicle-lab
```

---

## 🔒 Security Considerations

### For Production

1. **Disable Debug Mode**
   ```bash
   export FLASK_DEBUG=0
   ```

2. **Set Secret Key**
   ```python
   # In app.py, add:
   app.secret_key = os.getenv('SECRET_KEY', 'change-this-in-production')
   ```

3. **File Upload Limits**
   - Already set: 200MB max ✅
   - Consider reducing for production

4. **CORS Configuration**
   - Already configured ✅
   - Review allowed origins if needed

5. **HTTPS Only**
   - All platforms provide HTTPS ✅
   - No additional config needed

---

## 📊 Monitoring & Logs

### Render
- Logs: Dashboard → Service → Logs
- Metrics: Auto-collected

### Railway
- Logs: Dashboard → Deployments → Logs
- Metrics: Available in dashboard

### Heroku
```bash
heroku logs --tail
heroku logs --num 1000
```

---

## 🔄 Continuous Deployment

All platforms support auto-deploy:
- ✅ Push to `main` branch
- ✅ Platform auto-detects changes
- ✅ Auto-rebuilds and deploys
- ✅ Zero-downtime deployments (most platforms)

---

## 🐛 Troubleshooting

### Build Failures

**Issue**: `pip install` fails
**Solution**: 
- Check `requirements.txt` syntax
- Verify all packages available on PyPI
- Check Python version compatibility

**Issue**: Port binding error
**Solution**:
- Ensure `app.py` uses `PORT` env variable ✅ (Done)
- Check `Procfile` format

### Runtime Errors

**Issue**: App crashes on startup
**Solution**:
- Check logs for import errors
- Verify all dependencies installed
- Check file paths (use relative paths)

**Issue**: Upload fails
**Solution**:
- Check file size limits
- Verify disk space on platform
- Check upload directory permissions

### Performance Issues

**Issue**: Slow response times
**Solution**:
- Increase workers (Gunicorn)
- Enable caching
- Optimize file processing

---

## 📝 Post-Deployment

### Update README
1. Add live demo link
2. Update deployment status badge
3. Add screenshots

### Test Live Deployment
- [ ] Dashboard loads
- [ ] File upload works
- [ ] Analysis runs successfully
- [ ] Plots render correctly
- [ ] Export functions work

---

## 🎉 Success!

Your VEHICLE-LAB is now live! Share the URL:

```
https://your-app-name.onrender.com
```

---

## 📞 Support

- **Render**: [docs.render.com](https://docs.render.com)
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Heroku**: [devcenter.heroku.com](https://devcenter.heroku.com)

---

**Last Updated**: 2025

