import React, { useState } from 'react';
import './ApiKeyInput.css';

function ApiKeyInput({ onSave, onClear, hasExistingKey, onCancel }) {
  const [key, setKey] = useState('');

  const handleSubmit = () => {
    const trimmed = key.trim();
    if (trimmed) onSave(trimmed);
  };

  return (
    <div className="apikey-section">
      <div className="apikey-card">
        <div className="apikey-icon">🔑</div>
        <h2 className="apikey-title">
          {hasExistingKey ? 'Update API Key' : 'Connect to AI'}
        </h2>
        <p className="apikey-desc">
          Enter your Anthropic API key to power the food classifier. Your key stays in your browser and is only sent directly to the Anthropic API.
        </p>
        <div className="apikey-input-group">
          <input
            type="password"
            className="apikey-input"
            placeholder="sk-ant-..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            className="apikey-save-btn"
            onClick={handleSubmit}
            disabled={!key.trim()}
          >
            Save
          </button>
        </div>
        {hasExistingKey && (
          <div className="apikey-extra">
            <button className="apikey-link" onClick={onCancel}>Cancel</button>
            <button className="apikey-link apikey-link-danger" onClick={onClear}>Clear saved key</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiKeyInput;
