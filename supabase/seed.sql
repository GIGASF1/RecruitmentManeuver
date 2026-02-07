-- ══════════════════════════════════════════════════════════════
-- Seed Data — 3 Sample Opportunities
-- Run this AFTER creating a user account via the app.
-- Replace 'YOUR_USER_ID' with your actual auth.users UUID.
-- You can find it in the Supabase dashboard under Authentication > Users.
-- ══════════════════════════════════════════════════════════════

-- To use: Replace all instances of YOUR_USER_ID below with your actual UUID
-- Example: '123e4567-e89b-12d3-a456-426614174000'

-- Opportunity 1: Academic flagship
INSERT INTO opportunities (
  user_id, organization_name, city, state, practice_type,
  icu_model_description, icu_beds, open_vs_closed,
  schedule_description, call_frequency, nocturnist_coverage, tele_icu,
  base_salary, rvu_rate, signing_bonus, loan_repayment, pto_days, cme_budget, malpractice_covered,
  comp_notes,
  has_residents, has_fellows, has_apps, app_count, rt_coverage,
  culture_notes, leadership_opportunities, research_support, teaching_opportunities,
  procedures_available, benefits_notes, free_notes, stage
) VALUES (
  'YOUR_USER_ID',
  'University of Michigan Health',
  'Ann Arbor', 'Michigan', 'academic',
  'Three distinct ICUs: MICU (24 beds, closed), SICU (18 beds, semi-closed), and Cardiac ICU (12 beds, closed). Attending leads multidisciplinary rounds with dedicated pharmacist and social worker.',
  54, 'Closed ICU',
  '7-on/7-off ICU blocks, 2 half-days outpatient pulm clinic per week on off-service weeks. 4 ICU months/year typical for new attendings.',
  '1:5 (every fifth)', true, true,
  340000, 48.50, 40000, 100000, 30, 5000, true,
  'Base + wRVU above threshold. Partnership track after 3 years. Academic rank salary supplement available.',
  true, true, true, 6, '24/7 RT coverage, 3:1 patient ratio in MICU',
  'Collaborative, academic culture with strong mentorship. Weekly M&M and journal clubs. Faculty wellness committee active.',
  'Associate Medical Director of MICU available within 2 years. QI committee chair positions. Simulation center director role.',
  true, true,
  ARRAY['Bronchoscopy', 'Endobronchial Ultrasound (EBUS)', 'Thoracentesis', 'Chest Tube Placement', 'Central Line Placement', 'Intubation', 'Tracheostomy (Percutaneous)', 'Navigational Bronchoscopy', 'Point-of-Care Ultrasound', 'Pleuroscopy / Medical Thoracoscopy'],
  'Full benefits package: health/dental/vision, 403b with 10% match, relocation stipend $10k',
  'Strong brand, excellent research infrastructure. NIH-funded division. Potential for protected research time.',
  'interviewing'
);

-- Opportunity 2: Community with great comp
INSERT INTO opportunities (
  user_id, organization_name, city, state, practice_type,
  icu_model_description, icu_beds, open_vs_closed,
  schedule_description, call_frequency, nocturnist_coverage, tele_icu,
  base_salary, rvu_rate, signing_bonus, loan_repayment, pto_days, cme_budget, malpractice_covered,
  comp_notes,
  has_residents, has_fellows, has_apps, app_count, rt_coverage,
  culture_notes, leadership_opportunities, research_support, teaching_opportunities,
  procedures_available, benefits_notes, free_notes, stage
) VALUES (
  'YOUR_USER_ID',
  'Northwell Health - Lenox Hill',
  'New York', 'New York', 'community',
  'Mixed medical-surgical ICU, 20 beds, intensivist-led. High acuity with cardiac surgery and neuro patients. ECMO program growing.',
  20, 'Semi-closed / Hybrid',
  '7-on/7-off schedule. No outpatient clinic requirements. 100% ICU focus with some inpatient pulm consults on service weeks.',
  '1:4 (every fourth)', true, false,
  420000, 52.00, 75000, 50000, 35, 4000, true,
  'Guaranteed base for year 1-2, then transition to productivity model. Top earners making $500k+.',
  false, false, true, 4, '24/7 RT, dedicated RT for procedures',
  'Fast-paced, autonomous practice. Tight-knit ICU team. Weekly team dinners funded by department.',
  'Medical Director of Respiratory Therapy. ICU expansion committee. Hospital-wide sepsis initiative lead.',
  false, false,
  ARRAY['Bronchoscopy', 'Thoracentesis', 'Chest Tube Placement', 'Central Line Placement', 'Arterial Line Placement', 'Intubation', 'Tracheostomy (Percutaneous)', 'Point-of-Care Ultrasound'],
  'Health/dental/vision, 401k with 6% match, $5k relocation, disability insurance included',
  'Great compensation but no academic affiliation. Limited research. Strong APP team compensates for no residents.',
  'offer_received'
);

-- Opportunity 3: Hybrid — growing program
INSERT INTO opportunities (
  user_id, organization_name, city, state, practice_type,
  icu_model_description, icu_beds, open_vs_closed,
  schedule_description, call_frequency, nocturnist_coverage, tele_icu,
  base_salary, rvu_rate, signing_bonus, loan_repayment, pto_days, cme_budget, malpractice_covered,
  comp_notes,
  has_residents, has_fellows, has_apps, app_count, rt_coverage,
  culture_notes, leadership_opportunities, research_support, teaching_opportunities,
  procedures_available, benefits_notes, free_notes, stage
) VALUES (
  'YOUR_USER_ID',
  'Emory University / Grady Memorial',
  'Atlanta', 'Georgia', 'hybrid',
  'Grady MICU: 28 beds, closed unit. Emory University Hospital: 16-bed MICU. Rotating between both sites. ECMO center of excellence.',
  44, 'Closed ICU',
  'Block schedule: 2 weeks ICU, 2 weeks pulm clinic/procedures/admin. Call from home on off-service weeks.',
  '1:6 (every sixth)', false, true,
  370000, 45.00, 50000, 75000, 28, 6000, true,
  'Emory salary scale with Grady supplement. Academic rank-based increases. Procedure bonuses available.',
  true, true, true, 3, '24/7 at both sites, RT-driven weaning protocols',
  'Mission-driven culture at Grady. Academic excellence at Emory. Diverse patient population. Strong division identity.',
  'Fellowship Program Director (opening in 2 years). Pulm hypertension program development. Simulation fellowship director.',
  true, true,
  ARRAY['Bronchoscopy', 'Endobronchial Ultrasound (EBUS)', 'Thoracentesis', 'Chest Tube Placement', 'Central Line Placement', 'Arterial Line Placement', 'Intubation', 'Tracheostomy (Percutaneous)', 'Navigational Bronchoscopy', 'Cryotherapy', 'Point-of-Care Ultrasound', 'Pleural Catheter Management'],
  'Full Emory benefits, 403b with match, subsidized faculty housing, tuition benefit for dependents',
  'Exciting growth opportunity. Two-site model can be demanding but offers variety. Strong procedural volume. NIH and foundation funding available.',
  'researching'
);
